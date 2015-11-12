Etapes:
=====
express blogperso<br>
*************************************************************************************************************************<br>
Ajout de dépendances dans le package.json :<br>
	  "connect-flash":"*", ------>>>> Pour les messages flash('message ajouté merci...)<br>
	  "express-messages":"*",------>>>>Pour les notifications flash<br>
	  "express-session":"*",------>>>>Pour avoir des sessions<br>
	  "express-validator":"*",------>>>>Pour la validation les forms<br>
	  "moment":"*",------>>>>Pour le formatage des date<br>
	  "mongoose":"*"------>>>>ORM pour mongoDB<br>
ajout de nodemon pour le livereload, on lancera l'app avec "nodemon" au lieu de npm start<br>
*************************************************************************************************************************<br>
Ajout des middleware dans app.js<br>
var session = require('express-session');<br>
var expressValidator = require('express-validator');<br>
var flash = require('connect-flash');<br>
*************************************************************************************************************************<br>
Ajout d'un bout de code pour le middleware session : sur https://github.com/expressjs/session<br>
<br>
app.use(session({
	secret: 'secret keyboard cat',
	resave: false,
	saveUninitialized: true
}))
<br>
*************************************************************************************************************************<br>
Ajout d'un bout de code pour le middleware de validation : sur https://github.com/ctavan/express-validator<br>
<br>
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.')
				, root    = namespace.shift()
				, formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg   : msg,
			value : value
		};
	}
}));
<br>
*************************************************************************************************************************<br>
Ajout d'un bout de code pour le middleware de validation : sur https://github.com/expressjs/express-messages<br>
<br>
app.use(require('connect-flash')());
app.use(function (req, res, next) {
				// Assignation de require express-messages à la variable globale res.locals.messages  qui sera accessible dans les vues
	res.locals.messages = require('express-messages')(req, res);
	next();
});
<br>
*************************************************************************************************************************<br>
Connexion à mongoose<br>
Ajout dans app.js -> var mongoose = require('mongoose');<br>
//création de la base de donnée
mongoose.connect('mongodb://localhost/blogperso');
var db= mongoose.connection;

à partir de là on peur créer ses collections de documents
*************************************************************************************************************************<br>




























