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
	req.checkBody('categorie_titre','Le titre est requis!').notEmpty();
	req.checkBody('categorie_description','La description est requise!').notEmpty();

	var erreurs = req.validationErrors();
	if(erreurs){
		res.render('ajouter_categorie',{
			errors:erreurs,
			title:"Ajouter une categorie",
			categorie_description:"Ajouter une description"
		})
	}else{
		//res.send('test passé!')
		var categorie = new Categorie();
		categorie._id = req.body.categorie_titre;
		categorie.categorie_description = req.body.categorie_description;

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



router.post('/editer/:id',function(req,res){
	//On utilise Express validator pour faire de la validation
	req.checkBody('categorie_titre','Le titre est requis!').notEmpty();
	req.checkBody('categorie_description','La description est requise!').notEmpty();

	var erreurs = req.validationErrors();
	if(erreurs){
		console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
		res.render('editer_categorie',{
			errors:erreurs,
			title:"Ajouter une categorie",
			categorie_description:"Editer la description"
		})
	}else{
		console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
		//res.send('test passé!')
		var categorie = new Categorie();
		var requetePourMongoDb = {_id:[req.params.id]};
		var mettreAjour = {categorie_titre: req.body.categorie_titre, categorie_description: req.body.categorie_description};

		Categorie.mettreAjourCategorie(requetePourMongoDb,mettreAjour,{},function(err,categorie){
			if(err){
				res.send(err);
			}else{
				req.flash('success','Categorie mise à jour');
				res.redirect('/gestionnaire/categories');
			}
		});
	}

});

router.delete('/supprimer/:id',function(requete,reponse){
	var larequeteMongoDb = {_id : [requete.params.id]};
	Categorie.remove(larequeteMongoDb,function(erreur){
		if(erreur){
			reponse.send(erreur);
		}else{
			//pas de redirect car la requete AJAX le fait
			reponse.status(204).send();
		}
	})
});

module.exports = router;





























