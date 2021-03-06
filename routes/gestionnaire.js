var express = require('express');
var router = express.Router();
Categorie = require('../modeles/categorie.js');





// par défaut le get sera avec /gestionnaire/articles
router.get('/articles', function(req, res, next) {
	Categorie.recupCategories(function(err,categories){
		Article.recupArticles(function(err,articles){
			if(err){
				res.send(err);
			}else {
				res.render('gerer_articles', {
					title: 'gerer_articles',
					//Pas nécessaire car dans app.js j'ai cree une variable app.locals.categories pour rendre categories disponible partout
					categories: categories,
					articles: articles
				});
			}
		});
	});
});
router.get('/articles/ajouter', function(req, res, next) {
	Categorie.recupCategories(function(err,categories){
			if(err){
				res.send(err);
			}else {
				res.render('ajouter_article', {
					title: 'ajouter_article',
					//Pas nécessaire car dans app.js j'ai cree une variable app.locals.categories pour rendre categories disponible partout
					categories: categories
				});
			}
		});
});
router.get('/categories/ajouter', function(req, res, next) {
	res.render('ajouter_categorie', { title: 'ajouter_categorie' });
});


router.get('/articles/editer/:id', function(req, res, next) {
	Categorie.recupCategories(function(err,categories){
	Article.recupArticlesParId([req.params.id],function(err,article){
		if(err){
			res.send(err);
		}else {
			res.render('editer_article', {
				title: 'editer_article',
				//Pas nécessaire car dans app.js j'ai cree une variable app.locals.categories pour rendre categories disponible partout
				article: article,
				categories: categories
			})
		}
	})
	})
});
router.get('/categories/editer/:id', function(req, res, next) {

	Categorie.recupCategoriesParId([req.params.id],function(err,categorie){
		if(err){
			res.send(err);
		}else{
			res.render('editer_categorie', {
			title: 'editer_categorie',
			categorie:categorie});
		}
	})

});
router.get('/categories', function(req, res, next) {

	Categorie.recupCategories(function(err,categories){
		Article.recupArticles(function(err,articles){
			res.render('gerer_categories', {
				title: 'gerer_categories',
				//Pas nécessaire car dans app.js j'ai cree une variable app.locals.categories pour rendre categories disponible partout
				categories:categories,
				articles:articles
			});
		});
	});
});

module.exports = router;
