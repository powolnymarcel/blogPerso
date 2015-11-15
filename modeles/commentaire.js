var mongoose = require('mongoose');

var CommentaireSchema = new mongoose.Schema({
	commentaire_contenu: String,
	commentaire_auteur: String,
	commentaire_votePositifs: {
		type: Number,
		default: 0
	},
	commentaire_voteNegatifs: {
		type: Number,
		default: 0
	},
	commentaire_likes: {
		type: Number,
		default: 0
	},
	commentaire_article: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Article'
	},
	commentaire_creation:{
		type:Date,
		default:Date.now
	}
});



CommentaireSchema.methods.plus = function(cb) {
	this.votePositifs += 1;
	this.save(cb);
};

CommentaireSchema.methods.likes = function(cb) {
	this.likes += 1;
	this.save(cb);
};

CommentaireSchema.methods.moins = function(cb) {
	this.voteNegatifs += 1;
	this.save(cb);
};
mongoose.model('Commentaire', CommentaireSchema);

