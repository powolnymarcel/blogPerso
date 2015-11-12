var express = require('express');
var router = express.Router();

// par défaut le get sera avec /gestionnaire/articles
router.get('/articles', function(req, res, next) {
	//On passe le title correct pour le highlight du lien
	res.render('gerer_articles', { title: 'gerer_articles' });
});
router.get('/articles/ajouter', function(req, res, next) {
	//On passe le title correct pour le highlight du lien
	res.render('ajouter_article', { title: 'ajouter_article' });
});
router.get('/categories/ajouter', function(req, res, next) {
	//On passe le title correct pour le highlight du lien
	res.render('ajouter_categorie', { title: 'ajouter_categorie' });
});
router.get('/articles/editer/:id', function(req, res, next) {
	//On passe le title correct pour le highlight du lien
	res.render('editer_article', { title: 'editer_article' });
});
router.get('/categories/editer/:id', function(req, res, next) {
	//On passe le title correct pour le highlight du lien
	res.render('editer_categorie', { title: 'editer_categorie' });
});
router.get('/categories', function(req, res, next) {
	//On passe le title correct pour le highlight du lien
	res.render('gerer_categories', { title: 'gerer_categories' });
});

module.exports = router;
