var express = require('express');
var router = express.Router();
Categorie = require('../modeles/categorie.js');





/* GET home page. */
router.get('/', function(req, res, next) {
	Categorie.recupCategories(function(err,categories){
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
