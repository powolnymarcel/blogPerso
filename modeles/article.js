var mongoose = require('mongoose');

//Schéma categorie
var articleSchema= mongoose.Schema({
	titre:{
		type:String
	},
	contenu:{
		type:String
	},
	creation:{
		type:Date,
		default:Date.now
	},
	sous_titre:{
		type:String
	},
	image_url:{
		type:String
	},
	categorie:{
		type:String
	},
	auteur:{
		type:String
	}
});

//rendre l'objet disponible

var Categorie = module.exports = mongoose.model('Categorie', categorieSchema);

//Le crud se fera dans ce fichier, on instanciera l'objet Categorie dans la route et on appelera les fn ci dessous

//Récup les categories
// Pour l'utiliser dans d'autres fichiers il faut l'exports
module.exports.recupCategories = function(callback,limit){
	//Ici on DOIT utiliser les méthodes de mongoose, le limit et le sort sont optionnel
	Categorie.find(callback).limit(limit).sort([['titre','ascending']]);
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





























