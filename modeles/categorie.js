var mongoose = require('mongoose');

//Schéma categorie
var categorieSchema= mongoose.Schema({
	categorie_titre:{
		type:String
	},
	categorie_description:{
		type:String
	},
	categorie_creation:{
		type:Date,
		default:Date.now
	},categorie_articles: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
});

//rendre l'objet disponible

var Categorie = module.exports = mongoose.model('Categorie', categorieSchema);

//Le crud se fera dans ce fichier, on instanciera l'objet Categorie dans la route et on appelera les fn ci dessous

//Récup les categories
// Pour l'utiliser dans d'autres fichiers il faut l'exports
module.exports.recupCategories = function(callback,limit){
	//Ici on DOIT utiliser les méthodes de mongoose, le limit et le sort sont optionnel
	Categorie.find(callback).populate('Article').limit(limit).sort([['categorie_titre','ascending']]);
};

//Ajouter une catégorie
module.exports.ajouterCategorie = function(categorie,callback){
	//le create est un methode mongoose
	Categorie.create(categorie,callback)
};

//Récup une categorie ID
module.exports.recupCategoriesParId = function(id,callback){
	//le findById est un methode mongoose
	Categorie.findById(id,callback)
};

//Mettre à jour une categorie
module.exports.mettreAjourCategorie = function(requete,mettreAjour,options,callback){
	Categorie.findOneAndUpdate(requete,mettreAjour,options,callback)
};






























