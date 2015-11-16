Rappel: <br>
execution avec "nodemon"<br>
<hr>
<img src="http://www.ondego.be/divers/blog.png"/>
<hr>


Peut etre amélioré avec:
 un système de votes avec pouce vers le haut/bas ou like (coeur)<br>
 Mettre en place : dernier com, les + commentés, post populaire<br>
 Upload d'images<br>
 Gestion user pour les commentaires et/ou accès back office<br>
 Ajouter le tag cloud<br>
 avoir une collection distincte pour les commentaires<br>


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
Chercher un template de blog et l'integrer sur jade ( très long et très rébarbatif...)<br>
******************************************************************************************************************<br>
Créer 3 fichiers de routing : articles, categories, gestionnaireCrud<br>
******************************************************************************************************************<br>
Déclarer les fichiers routes dans app.js   :13 , :70<br>
******************************************************************************************************************<br>
modifier les fichiers routes pour qu'ils interagissent avec les jade<br>
******************************************************************************************************************<br>
******************************************************************************************************************<br>
<h3>Les catégories</h3>
On crée le modèle Categorie<br>
On ajoute 2 ou 3 catégorie "à la mano" via le shell<br>
Dans le fichier categorie routing, on appelle l'objet categorie<br>
On injecte dans la route l'objet avec la fn "recupCategories"<br>
On crée la fn recupCategories dans le modele<br>
******************************************************************************************************************<br>
Création de la route ajouter pour les categories<br>
On fais de la validation avec express validator<br>
dans la vue on loop sur "errors" si il y en a et on les affiche si besoin<br>
SI PAS d'erreurs la route passe dans le "else" et appelle la fonction du modele<br>
ajouterCategorie<br>
Si cette fonction a fait correctement son boulot on active un flash<br>
On place ce flash dans la vue ->  != messages()<br>
Avant de tester il faut créer la fn dans le modele<br>
******************************************************************************************************************<br>
Ensuite update<br>
Modifier le jade pour avoir les champs remplis avec les bonnes data<br>
Creer la route  post('/editer/:id')  dans le routing categorie<br>
Créer dans cette route post 2 variable : requetPourMongoDb  et mettreAjour<br>
la première pour indiquer l'id de la cat<br>
la seconde pour indiquer ce qu'il faut meetre à jour<br>
Sans oublier le plus important créer la fn mettreAjourCategorie dans le modele categories.js<br>
******************************************************************************************************************<br>
Ensuite le delete<br>
Creer un bouton delete avec 2 attributs <br>
<ul>
<li>data-categorie-id=categorie._id.toString()</li>
<li>data-csrf=locals._csrf) Supprimer</li>
</ul>
Le premier servira a récuperer l'id de la categorie<br>
Le second est la protection contre le xss<br>
<br>
Vu qu'à ce stade du site on utilisa pas Angular, on va faire l'action de suppression via AJAX car on a besoin que le type de requete soit un DELETE<br>
type: 'DELETE',<br>
On crée donc un fichier js avec un appel en ajax voir "monscript.js", ne pas oublier d'appler ce fichier dans le template !<br>
Finalement on crée la route /delete/:id<br>
******************************************************************************************************************<br>
******************************************************************************************************************<br>
<h3>Les articles</h3>
Via le mongo shell on ajoute 2-3 articles à la mano :p<br><br>
On crée le modele article.js<br>
Ensuite le template<br>
On utilise le module "moment" pour formater la date<br>
On l'appelle dans app.js -- > app.locals.moment = require('moment');<br>
dans la vue -->#{moment(article.article_titre).format('L')}<br>
voir : http://momentjs.com/docs/#/displaying/<br>


!{article.article_contenu}
#{article.article_contenu}







