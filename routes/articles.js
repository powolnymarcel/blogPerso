var express = require('express');
var router = express.Router();
Categorie = require('../modeles/categorie.js');
Article = require('../modeles/article.js');

router.post('/article/article/like/:id', function(req, res, next) {
	console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrr')
	Article.plus(function(err, article){
		if (err) { return next(err); }

		res.json(article);
	});
});


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


	Article.recupArticles({article_categories:req.params.categorie_id},function(err,articles){
		if(err){
			console.log(err);
			res.send(err);
		}else {
			Categorie.recupCategoriesParId(req.params.categorie_id,function(err,categorie){
				res.render('articles',{
					"title": categorie.categorie_titre,
					"articles":articles
				});
			});
		}
	});
});





router.post('/ajouter',function(req,res){
	//On utilise Express validator pour faire de la validation
	req.checkBody('article_titre','Le titre est requis!').notEmpty();
	req.checkBody('article_sous_titre','La sous_titre est requis!').notEmpty();
	req.checkBody('article_categories','La categorie est requise!').notEmpty();
	req.checkBody('article_auteur','La auteur est requis!').notEmpty();
	req.checkBody('article_contenu','Le contenu est requis!').notEmpty();
	req.checkBody('article_image_url','La photo est requiss!').notEmpty();

	var erreurs = req.validationErrors();
	if(erreurs){
		res.render('ajouter_article',{
			errors:erreurs,
			title:"Ajouter une categorie",
			"article_titre":				req.body.article_titre,
			"article_sous_titre":			req.body.article_sous_titre,
			"article_categories":			req.body.article_categories,
			"article_auteur":				req.body.article_auteur,
			"article_contenu":				req.body.article_contenu,
			"article_image_url":			req.body.article_image_url,
			"article_en_vedette":			req.body.article_en_vedette
		})
	}else{
		//res.send('test passé!')
		var article = new Article();
		var envedette = req.body.article_en_vedette;
		if(typeof envedette === 'undefined'){
			envedette = false;
		}
		else{
			envedette=true;
		}

		article.article_titre 				= req.body.article_titre,
		article.article_sous_titre 			= req.body.article_sous_titre,
		article.article_categories 			= req.body.article_categories,
		article.article_auteur 				= req.body.article_auteur,
		article.article_contenu				= req.body.article_contenu,
		article.article_image_url 			= req.body.article_image_url,
		article.article_en_vedette 			= envedette

		Article.ajouterArticle(article,function(err,article){
			if(err){
				res.send(err);
			}else{
				req.flash('success','Article ajouté avec succes');
				res.redirect('/gestionnaire/articles');
			}
		});
	}

});





router.post('/editer/:id',function(req,res){
	//On utilise Express validator pour faire de la validation
	req.checkBody('article_titre','Le titre est requis!').notEmpty();
	req.checkBody('article_sous_titre','La sous_titre est requis!').notEmpty();
	req.checkBody('article_categories','La categorie est requise!').notEmpty();
	req.checkBody('article_auteur','La auteur est requis!').notEmpty();
	req.checkBody('article_contenu','Le contenu est requis!').notEmpty();
	req.checkBody('article_image_url','La photo est requis!').notEmpty();

	var erreurs = req.validationErrors();
	if(erreurs){
		res.render('ajouter_article',{
			article_titre:			req.body.article_titre,
			article_sous_titre:		req.body.article_sous_titre,
			article_categories:		req.body.article_categories,
			article_auteur:			req.body.article_auteur,
			article_contenu:		req.body.article_contenu,
			article_image_url:		req.body.article_image_url,
			article_en_vedette:		req.body.article_en_vedette
		});
	}else{
		//res.send('test passé!')
		var article = new Article();
		var requete = {_id:[req.params.id]};
		var envedette = req.body.article_en_vedette;
		if(typeof envedette === 'undefined'){
			envedette = false;
		}
		else{
			envedette=true;
		}
		var mettreAjour={
			article_titre			:req.body.article_titre,
			article_sous_titre		:req.body.article_sous_titre,
			article_categories		:req.body.article_categories,
			article_auteur			:req.body.article_auteur,
			article_contenu			:req.body.article_contenu,
			article_image_url		:req.body.article_image_url,
			article_en_vedette		:envedette
		};




		Article.mettreAjourArticle(requete,mettreAjour,{},function(err,article){
			if(err){
				res.send('Erreur: '+err);
			}else{
				req.flash('success','Article mis à jour');
				res.location('/gestionnaire/articles');
				res.redirect('/gestionnaire/articles');
			}
		})
	}

});

router.delete('/supprimer/:id',function(requete,reponse){
	var larequeteMongoDb = {_id : [requete.params.id]};
	Article.remove(larequeteMongoDb,function(erreur){
		if(erreur){
			reponse.send(erreur);
		}else{
			//pas de redirect car la requete AJAX le fait
			reponse.status(204).send();
		}
	})
});



router.post('/commentaires/ajouter/:id',function(req,res,next) {
	req.checkBody('commentaire_email_auteur', 'Le mail est requis!').notEmpty();
	req.checkBody('commentaire_auteur', 'Le nom est requis!').notEmpty();
	req.checkBody('commentaire_contenu', 'La message  est requis!').notEmpty();
	var erreurs = req.validationErrors();
	if(erreurs){
		Article.recupArticlesParId([req.params.id],function(err,article){
			if(err){
			console.log(err);
				res.send(err);
			}
			else{
				res.render('article',{
					"errors":erreurs,
					"article":article,
					"commentaire_email_auteur":req.body.commentaire_email_auteur,
					"commentaire_auteur":req.body.commentaire_email_auteur,
					"commentaire_contenu":req.body.commentaire_email_auteur,
					"commentaire_sujet":req.body.commentaire_sujet
				});
			}
		});
	}else{
		var article = new Article();
		var requete = {_id:[req.params.id]};
		var commentaire = {
			"commentaire_email_auteur":req.body.commentaire_email_auteur,
			"commentaire_auteur":req.body.commentaire_auteur,
			"commentaire_contenu":req.body.commentaire_contenu,
			"commentaire_sujet":req.body.commentaire_sujet
		};
		Article.ajouterCommentaire(requete,commentaire,function(err,article){
			if(err){
				res.send('erreur: ' + err)
			}else{
				Article.recupArticlesParId([req.params.id],function(err,article){
					if(err){
						console.log(err);
						res.render('erreur: '+ err)
					}else{
						res.render('article',{
							"article": article,
							"successMsg": 'commentaire ajouté'
						})
					}
				})
			}
		})
	}
});




module.exports = router;
