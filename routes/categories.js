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
				//Pas nécessaire car dans app.js j'ai cree une variable app.locals.categories pour rendre categories disponible partout
				categories:categories
			});
			console.log(categories);
		}
	});
});


router.post('/ajouter',function(req,res){
	//On utilise Express validator pour faire de la validation
	req.checkBody('titre','Le titre est requis!').notEmpty();
	req.checkBody('description','La description est requise!').notEmpty();

	var erreurs = req.validationErrors();
	if(erreurs){
		res.render('ajouter_categorie',{
			errors:erreurs,
			title:"Ajouter une categorie",
			description:"Ajouter une description"
		})
	}else{
		//res.send('passé!')
		var categorie = new Categorie();
		categorie.titre = req.body.titre;
		categorie.description = req.body.description;

		Categorie.ajouterCategorie(categorie,function(err,categorie){
			if(err){
				res.send(err);
			}else{
				req.flash('success','Categorie ajoutée avec succes');
				res.redirect('/gestionnaire/categories');
			}
		});
	}

});
module.exports = router;





























