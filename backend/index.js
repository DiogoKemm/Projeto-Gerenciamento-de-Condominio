const express = require('express')
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require("cors");
const pgp = require('pg-promise')();
const nodemailer = require('nodemailer');

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { Strategy, ExtractJwt } = require("passport-jwt");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const usuario = 'postgres';
const senha = 'postgres';
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/condominio`);

const upload = multer();
const app = express();
app.use(cors());
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.array());
app.use(express.static('public'));

app.use(
   session({
      secret: 'Super_secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true },
   }),
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
		},
		async (username, password, done) => {
			try {
				// busca o usuário no banco de dados
				const user = await db.oneOrNone(
					"SELECT * FROM users WHERE user_id = $1;",
					[username],
				);

				// se não encontrou, retorna erro
				if (!user) {
					return done(null, false, { message: "Usuário incorreto." });
				}

				// verifica se o hash da senha bate com a senha informada
				const passwordMatch = await bcrypt.compare(
					password,
					user.user_password,
				);

				// se senha está ok, retorna o objeto usuário
				if (passwordMatch) {
					console.log("Usuário autenticado!");
					return done(null, user);
				} else {
					// senão, retorna um erro
					return done(null, false, { message: "Senha incorreta." });
				}
			} catch (error) {
				return done(error);
			}
		},
	),
);

passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, {
			user_id: user.user_id,
			username: user.user_id,
		});
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});

const requireJWTAuth = passport.authenticate("jwt", { session: false });

app.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
		// Cria o token JWT
      console.log(req.body.username);
		const token = jwt.sign({ username: req.body.username }, "your-secret-key", {
			expiresIn: "1h",
		});

		res.json({ message: "Login successful", token: token });
	},
);

app.post("/logout", function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});


const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: 'diogogarmerich@gmail.com',
      pass: 'hetg yfcg qjwp xtsj '
   }
});

app.get("/", async (req, res) => {
   res.send("Hello :)")
})

app.get("/moradores", async (req, res) => {
   const data = await db.any('SELECT * FROM morador ORDER BY apartamento');
   res.json(data);
});

app.delete("/mercadorias/:id", async (req, res) => {
   const id = req.params.id;
   await db.none(`DELETE FROM mercadoria WHERE "pedido" = ${id}`);
});

app.get("/mercadorias", async (req, res) => {
   const data = await db.any('SELECT * from mercadoria JOIN morador ON morador."CPF" = mercadoria."CPFmorador" ORDER BY pedido');
   res.json(data);
})

app.post("/CadastrarMorador", async (req, res) => {
   try {
      const nome = req.body.nome;
      const email = req.body.email;
      const apartamento = req.body.apartamento;
      const bloco = req.body.bloco;
      const cpf = req.body.cpf;
      const telefone = req.body.telefone;

      db.none('INSERT INTO morador("CPF", "nome", "telefone", "apartamento", "bloco", "email") VALUES($1, $2, $3, $4, $5, $6)', [cpf, nome, telefone, apartamento, bloco, email]);
   }
   catch {
      console.log(error);
   }
});

app.post("/CadastrarZelador", async (req, res) => {

})

app.post("/CadastrarMercadoria", async (req, res) => {
   try {
      const pedido = req.body.pedido;
      const cpf = req.body.cpf;
      const email = await db.any('SELECT "email" FROM morador JOIN mercadoria ON mercadoria."CPFmorador"=morador."CPF" WHERE "CPF" = $1', [cpf]);
      db.none('INSERT INTO mercadoria("pedido", "CPFmorador") VALUES ($1, $2)', [pedido, cpf])
      let message = {
         from: "diogogarmerich@gmail.com",
         to: email[0].email,
         subject: "Você tem um pacote na portaria!",
         text: `Seu pedido de nota fiscal ${pedido} chegou! Por favor, vá retirá-lo`
      };
      transporter.sendMail(message, function (error, info) {
         if (error) {
            console.log(error);
         } else {
            console.log("email sent! " + info.response);
         }
      })
   } catch {
      console.log(error);
   }

});

app.listen(8080, () => console.log('API is running on http://localhost:8080/'));