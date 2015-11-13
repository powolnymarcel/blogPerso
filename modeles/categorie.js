var mongoose = require('mongoose');

//Schéma categorie
var categorieSchema= mongoose.Schema({
	titre:{
		type:String
	},
	description:{
		type:String
	},
	creation:{
		type:Date,
		default:Date.now
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
//Récup une categorie






























