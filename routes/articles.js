var express = require('express');
var router = express.Router();
Categorie = require('../modeles/categorie.js');



router.get('/', function(req, res, next) {
	Categorie.recupCategories(function(err,categories){
		Article.recupArticles(function(err,articles){
			if(err){
				res.send(err);
			}else {
				res.render('articles', {
					title: 'articles',
					//Pas nécessaire car dans app.js j'ai cree une variable app.locals.categories pour rendre categories disponible partout
					categories: categories,
					articles: articles
				});
			}
		});
	});
});


router.get('/articleunique/:id', function(req, res, next) {
	Article.recupArticlesParId([req.params.id],function(err,article){
		if(err){
			res.send(err);
		}else {
			res.render('article', {
				//Pas nécessaire car dans app.js j'ai cree une variable app.locals.categories pour rendre categories disponible partout
				article: article
			});
		}
	});
});
router.get('/categorie/:categorie_id', function(req, res, next) {
	//On passe le title correct pour le highlight du lien
	res.render('articles');
});
module.exports = router;
