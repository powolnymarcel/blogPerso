var express = require('express');
var router = express.Router();

Categorie = require('../modeles/categorie.js');

// par défaut le get sera avec /a-propos
router.get('/', function(req, res, next) {
	Categorie.recupCategories(function(err,categories){
		if(err){
			res.send(err);
		}else{
			res.render('categories', {
				title: 'categories',
				categories:categories
			});
			console.log(categories);
		}
	});
	//On passe le title correct pour le highlight du lien
});

module.exports = router;
