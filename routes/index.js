var express = require('express');
var router = express.Router();
Categorie = require('../modeles/categorie.js');
Article = require('../modeles/article.js');





/* GET home page. */
router.get('/', function(req, res, next) {
	Article.recupArticles(function(err,articles){
		console.log('Article-Article-Article-Article-Article-Article-');
		if(err){
			res.send(err);
		}else{
			res.render('index', {
				title: 'accueil',
				//Pas nécessaire car dans app.js j'ai cree une variable app.locals.categories pour rendre categories disponible partout
				articles:articles
			});
			console.log(articles);
		}
	});

	Categorie.recupCategories(function(err,categories){
		console.log('Categorie-Categorie-Categorie-Categorie-Categorie-');
		if(err){
			res.send(err);
		}else{
			res.render('index', {
				title: 'accueil',
				//Pas nécessaire car dans app.js j'ai cree une variable app.locals.categories pour rendre categories disponible partout
				categories:categories
			});
			console.log(categories);
		}
	});
});

module.exports = router;
