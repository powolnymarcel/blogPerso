var express = require('express');
var router = express.Router();
Categorie = require('../modeles/categorie.js');



router.get('/', function(req, res, next) {
	Article.recupArticles(function(err,articles){
		console.log('Article-Article-Article-Article-Article-Article-');
		if(err){
			res.send(err);
		}else{
			res.render('articles', {
				title: 'articles',
				//Pas nécessaire car dans app.js j'ai cree une variable app.locals.categories pour rendre categories disponible partout
				articles:articles
			});
			console.log(articles);
		}
	});

	//On passe le title correct pour le highlight du lien
	Categorie.recupCategories(function(err,categories){
		if(err){
			res.send(err);
		}else{
			res.render('articles', {
				title: 'articles',
				//Pas nécessaire car dans app.js j'ai cree une variable app.locals.categories pour rendre categories disponible partout
				categories:categories
			});
			console.log(categories);
		}
	});});
router.get('/articleunique/:id', function(req, res, next) {
	//On passe le title correct pour le highlight du lien
	res.render('article');
});
router.get('/categorie/:categorie_id', function(req, res, next) {
	//On passe le title correct pour le highlight du lien
	res.render('articles');
});
module.exports = router;
