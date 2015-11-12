var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	//On passe le title correct pour le highlight du lien
	res.render('articles', { title: 'articles' });
});
router.get('/articleunique/:id', function(req, res, next) {
	//On passe le title correct pour le highlight du lien
	res.render('article');
});
router.get('/categorie/:categorie_id', function(req, res, next) {
	//On passe le title correct pour le highlight du lien
	res.render('articles');
});
module.exports = router;
