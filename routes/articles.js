var express = require('express');
var router = express.Router();

// par défaut le get sera avec /a-propos
router.get('/', function(req, res, next) {
	//On passe le title correct pour le highlight du lien
	res.render('articles', { title: 'Tous les articles' });
});
// par défaut le get sera avec /a-propos
router.get('/articleunique/:id', function(req, res, next) {
	//On passe le title correct pour le highlight du lien
	res.render('article');
});
module.exports = router;
