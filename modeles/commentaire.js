var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	contenu: String,
	auteur: String,
	votePositifs: {type: Number, default: 0},
	voteNegatifs: {type: Number, default: 0},
	likes: {type: Number, default: 0},
	article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
});



CommentSchema.methods.plus = function(cb) {
	this.votePositifs += 1;
	this.save(cb);
};

CommentSchema.methods.moins = function(cb) {
	this.voteNegatifs += 1;
	this.save(cb);
};
mongoose.model('Comment', CommentSchema);

