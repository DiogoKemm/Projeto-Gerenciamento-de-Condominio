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

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: "your-secret-key",
		},
		async (payload, done) => {
			try {
				const user = await db.oneOrNone(
					"SELECT * FROM users WHERE user_id = $1;",
					[payload.username],
				);

				if (user) {
					done(null, user);
				} else {
					done(null, false);
				}
			} catch (error) {
				done(error, false);
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

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'diogogarmerich@gmail.com',
		pass: 'hetg yfcg qjwp xtsj '
	}
});

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

app.get("/moradores", requireJWTAuth, async (req, res) => {
	const data = await db.any('SELECT * FROM morador ORDER BY apartamento');
	res.json(data);
});

app.delete("/mercadorias/:id", requireJWTAuth, async (req, res) => {
	const id = req.params.id;
	await db.none(`DELETE FROM mercadoria WHERE nota_fiscal = ${id}`);
});

app.get("/mercadorias", requireJWTAuth, async (req, res) => {
	const data = await db.any('SELECT * from mercadoria JOIN morador ON morador.cpf = mercadoria.cpf ORDER BY nota_fiscal');
	res.json(data);
})

app.post("/CadastrarMorador", requireJWTAuth, async (req, res) => {
	try {
		const nome = req.body.nome;
		const email = req.body.email;
		const apartamento = req.body.apartamento;
		const bloco = req.body.bloco;
		const cpf = req.body.cpf;
		const telefone = req.body.telefone;

		db.none('INSERT INTO morador(CPF, nome, telefone, apartamento, bloco, email) VALUES($1, $2, $3, $4, $5, $6)', [cpf, nome, telefone, apartamento, bloco, email]);
	}
	catch {
		console.log(error);
	}
});

app.post("/CadastrarMercadoria", requireJWTAuth, async (req, res) => {
	try {
		const pedido = req.body.pedido;
		const cpf = req.body.cpf;
		db.none('INSERT INTO mercadoria(nota_fiscal, cpf VALUES ($1, $2)', [pedido, cpf])
		const email = await db.any('SELECT morador.email FROM morador JOIN mercadoria ON mercadoria.cpf=morador.cpf WHERE cpf = $1', [cpf]);
		let message = {
			from: "diogogarmerich@gmail.com",
			to: email[0].email,
			subject: "Você tem um pacote na portaria!",
			text: `Seu pedido de nota fiscal ${pedido} chegou! Por favor, vá retirá-lo na portaria.`
		};
		transporter.sendMail(message, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("email sent! " + info.response);
			}
		})
	} catch (error) {
		console.log(error);
	}

});

app.post("/novoUsuario", requireJWTAuth, async (req, res) => {
	const saltRounds = 10;
	try {
		const userEmail = req.body.email;
		console.log(userEmail);
		const userPasswd = req.body.passwd.toString();
		console.log(userPasswd);
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashedPasswd = bcrypt.hashSync(userPasswd, salt);

		console.log(`Email: ${userEmail} - Passwd: ${hashedPasswd}`);
		db.none("INSERT INTO users (user_id, user_password) VALUES ($1, $2);", [
			userEmail,
			hashedPasswd,
		]);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/'));