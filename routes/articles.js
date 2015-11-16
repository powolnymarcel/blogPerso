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
	//On passe le title correct pour le highlight du lien
	res.render('articles');
});





router.post('/ajouter',function(req,res){
	//On utilise Express validator pour faire de la validation
	req.checkBody('titre','Le titre est requis!').notEmpty();
	req.checkBody('sous_titre','La sous_titre est requis!').notEmpty();
	req.checkBody('categorie','La categorie est requise!').notEmpty();
	req.checkBody('auteur','La auteur est requis!').notEmpty();
	req.checkBody('contenu','Le contenu est requis!').notEmpty();

	var erreurs = req.validationErrors();
	if(erreurs){
		res.render('ajouter_article',{
			errors:erreurs,
			title:"Ajouter une categorie",
			contenu:"Ajouter une description"
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
		article.article_titre = req.body.titre;
		article.article_sous_titre = req.body.sous_titre;
		article.article_categories = req.body.categorie;
		article.article_auteur = req.body.auteur;
		article.article_contenu = req.body.contenu;
		article.article_image_url = req.body.image_url;
		article.article_en_vedette = envedette;

		Article.ajouterArticle(article,function(err,article){
			if(err){
				res.send(err);
			}else{
				req.flash('success','Article ajoutée avec succes');
				res.redirect('/gestionnaire/articles');
			}
		});
	}

});





module.exports = router;
