var mongoose = require('mongoose');

//Schéma categorie
var ArticleSchema= mongoose.Schema({
	article_titre:{
		type:String
	},
	article_contenu:{
		type:String
	},
	article_creation:{
		type:Date,
		default:Date.now
	},
	article_sous_titre:{
		type:String
	},
	article_en_vedette : Boolean,
	article_image_url:{
		type:String,
		default:'http://placehold.it/300x190'
	},
	article_categories: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' }],
	article_auteur:{
		type:String
	},
	article_votePositifs: {type: Number, default: 0},
	article_voteNegatifs: {type: Number, default: 0},
	article_likes: {type: Number, default: 0},
	article_commentaires: [
		{ 	commentaire_sujet: {type:String} ,
			commentaire_contenu: {type:String},
			commentaire_auteur: {type:String},
			commentaire_email_auteur: {type:String},
			commentaire_date: {type:Date,default:Date.now}
		}],
	article_commentaires_version2: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Commentaire' }]
});

//rendre l'objet disponible
var Categorie = module.exports = mongoose.model('Article', ArticleSchema);




//Le crud se fera dans ce fichier, on instanciera l'objet Categorie dans la route et on appelera les fn ci dessous
//Récup les articles
// Pour l'utiliser dans d'autres fichiers il faut l'exports
module.exports.recupArticles= function(requete,callback,limit){
	//Ici on DOIT utiliser les méthodes de mongoose, le limit et le sort sont optionnel
	Article.find(requete,callback).populate('Categorie', 'categorie_titre').limit(limit).sort([['creation','ascending']]);

};
module.exports.recupArticlesFrontpage= function(callback,limit){
	//Ici on DOIT utiliser les méthodes de mongoose, le limit et le sort sont optionnel
	Article.find(callback).populate('Categorie', 'categorie_titre').limit(8).sort([['creation','ascending']]);
};

//Ajouter un Articles
module.exports.ajouterArticle = function(article,callback){
	//le create est un methode mongoose
	Article.create(article,callback)
};

//Récup une categorie ID
module.exports.recupArticlesParId = function(id,callback){
	//le findById est un methode mongoose
	Article.findById(id,callback)
};

//Mettre à jour une categorie
module.exports.mettreAjourArticle = function(requete,mettreAjour,options,callback){
	Article.findOneAndUpdate(requete,mettreAjour,options,callback)
};


//Ajouter un commentaire
module.exports.ajouterCommentaire = function(requete,commentaire,callback){
	Article.mettreAjourArticle(requete,
			//Etant donné que les commentaires sont stockés dans ce document sous forme d'un array il on devrai faire un push
			{$push:{
				"article_commentaires":commentaire
			}

			},
			callback);
};





ArticleSchema.methods.plus = function(cb) {
	this.article_likes += 1;
	this.save(cb);
};






















