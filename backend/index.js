require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const multer = require("multer")
const cors = require("cors");
const pgp = require('pg-promise')();
const nodemailer = require('nodemailer');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const usuario = process.env.DB_USER;
const senha = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;
const db = pgp(`postgres://${usuario}:${senha}@${host}:${port}/${database}`);

const app = express();
const upload = multer()
app.use(cors());
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false },
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
			secretOrKey: process.env.JWT_SECRET,
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
			role: user.role
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
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	}
});

const requireSindico = (req, res, next) => {
	// Verifique se o usuário está autenticado e tem a role 'Sindico'
	if (req.user.role === 'Sindico') {
		next(); 
	} else {
		res.status(403).json({ message: "Acesso negado. Somente o síndico pode acessar esta página." });
	}
};

app.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
	// Cria o token JWT
	const token = jwt.sign({ username: req.user.user_id, role: req.user.role }, "your-secret-key", {
		expiresIn: "1h",
	});

	res.json({ message: "Login successful", token: token, role: req.user.role });
},
);

app.get("/", (req, res) => {
	res.send("Welcome to the Condominio API!");
});

app.post("/logout", function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

app.get("/moradores", requireJWTAuth, async (req, res) => {
	const data = await db.any('SELECT * FROM morador m RIGHT JOIN apartamento a ON a.numero = m.ap_num AND a.bloco = m.ap_bloco ORDER BY nome');
	res.json(data);
});

app.delete("/moradores/:id", requireJWTAuth, async (req, res) => {
	const id = req.params.id;
	try {
        await db.tx(async t => {
            // Primeiro deleta as mercadorias associadas
            await t.none(
                'DELETE FROM mercadoria WHERE cpf_morador = $1', 
                [id]
            );
            
            // Depois deleta o morador
            await t.none(
                'DELETE FROM morador WHERE cpf = $1', 
                [id]
            );
        });
        
        res.sendStatus(200);
    } catch (error) {
        console.error('Erro ao deletar morador:', error);
        res.status(500).json({ 
            error: "Erro ao deletar morador", 
            details: error.message 
        });
    }

});

app.delete("/mercadorias/:id", requireJWTAuth, async (req, res) => {
	const id = req.params.id;
	await db.none('DELETE FROM mercadoria WHERE "ID" = $1', [id]);
	res.sendStatus(200);
});

app.get("/mercadorias", requireJWTAuth, async (req, res) => {
	const data = await db.any(`
        SELECT 
            m.nome, 
            m.telefone, 
            me.*,
            a.numero as apartamento_numero,
            a.bloco
        FROM mercadoria me
        JOIN morador m ON me.cpf_morador = m.cpf
        JOIN apartamento a ON m.ap_num = a.numero AND m.ap_bloco = a.bloco
        ORDER BY me.data_rec DESC
    `);
	res.json(data);
})

app.get("/countMercadorias", requireJWTAuth, async(req, res) => {
	const data = await db.one(`
		SELECT
			count(*) as total
		FROM mercadoria`);
	res.json(data);
})

app.post("/CadastrarMorador", requireJWTAuth, upload.none(), async (req, res) => {
	try {
		const { nome, email, cpf, telefone, apartamento, bloco, papel } = req.body;

		await db.none(
			'INSERT INTO morador(cpf, nome, email, telefone, ap_num, ap_bloco) VALUES ($1, $2, $3, $4, $5, $6)',
			[cpf, nome, email, telefone, apartamento, bloco, papel]
		);
		res.sendStatus(201);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Erro ao cadastrar morador" });
	}
});

app.post("/CadastrarApartamento", requireJWTAuth, async (req, res) => {
	try {
		const numero = req.body.nAP;
		const bloco = req.body.nBloco;
		db.none('INSERT INTO apartamento(numero, bloco) VALUES ($1, $2)', [numero, bloco]);
	}
	catch (error) {
		res.status(500).json({error: error});
	}
})

app.post("/CadastrarMercadoria", requireJWTAuth, async (req, res) => {
	try {
		const { pedido, cpf } = req.body;

		await db.none(
			'INSERT INTO mercadoria(cpf_morador,  data_rec, "ID") VALUES ($1, CURRENT_DATE, $2)',
			[cpf, pedido]
		);

		// // Obter email do morador
		// const morador = await db.one(
		// 	'SELECT email FROM morador WHERE cpf = $1',
		// 	[cpf]
		// );

		// // Enviar email
		// const message = {
		// 	from: process.env.EMAIL_USER,
		// 	to: morador.email,
		// 	subject: "Você tem um pacote na portaria!",
		// 	text: `Sua encomenda "${pedido}" foi registrada. Data de recebimento: ${new Date().toLocaleDateString()}`
		// };

		// transporter.sendMail(message);
		res.sendStatus(201);
	} catch (err) {
		res.status(500).json({ error: err.message});
	}

});

app.post("/novoUsuario", requireJWTAuth, requireSindico, upload.none(), async (req, res) => {
	const saltRounds = 10;
	try {
		const userEmail = req.body.email;
		const userPasswd = req.body.passwd.toString();
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashedPasswd = bcrypt.hashSync(userPasswd, salt);

		db.none("INSERT INTO users (user_id, user_password, role) VALUES ($1, $2, $3);", [
			userEmail,
			hashedPasswd,
			'Zelador'

		]);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/'));