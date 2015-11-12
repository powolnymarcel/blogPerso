Etapes:
=====
express blogperso<br>
******************************************************************************************************************<br>
Ajout de dépendances dans le package.json :
<br>
```javascript
	  //Pour les messages flash('message ajouté merci...)
	  "connect-flash":"*",
	  //Pour les notifications flash
	  "express-messages":"*",
	  //Pour avoir des sessions
	  "express-session":"*",
	  //Pour la validation les forms
	  "express-validator":"*",
	  //Pour le formatage des date
	  "moment":"*",
	  //ORM pour mongoDB
	  "mongoose":"*"
```
ajout de nodemon pour le livereload, on lancera l'app avec "nodemon" au lieu de npm start<br>
******************************************************************************************************************<br>
Ajout des middleware dans app.js
<br>
```javascript
var session = require('express-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
```
******************************************************************************************************************<br>
Ajout d'un bout de code pour le middleware session : sur https://github.com/expressjs/session<br>
<br>
```javascript
app.use(session({
	secret: 'secret keyboard cat',
	resave: false,
	saveUninitialized: true
}))
```
<br>
******************************************************************************************************************<br>
Ajout d'un bout de code pour le middleware de validation : sur https://github.com/ctavan/express-validator<br>
<br>
```javascript
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
```
<br>
******************************************************************************************************************<br>
Ajout d'un bout de code pour le middleware de validation : sur https://github.com/expressjs/express-messages<br>
<br>
```javascript
app.use(require('connect-flash')());
app.use(function (req, res, next) {
				// Assignation de require express-messages à la variable globale res.locals.messages  qui sera accessible dans les vues
	res.locals.messages = require('express-messages')(req, res);
	next();
});
```
<br>
******************************************************************************************************************<br>
Connexion à mongoose<br>
Ajout dans app.js<br>
```javascript
var mongoose = require('mongoose');
```
<br>
//création de la base de donnée
```javascript
mongoose.connect('mongodb://localhost/blogperso');
var db= mongoose.connection;
```
à partir de là on peur créer ses collections de documents
******************************************************************************************************************<br>
Chercher un template de blog et l'integrer sur jade<br>
******************************************************************************************************************<br>
Créer 3 fichiers de routing : articles, categories, gestionnaireCrud<br>
******************************************************************************************************************<br>
Déclarer les routes dans app.js   :13 , :70<br>
******************************************************************************************************************<br>





























