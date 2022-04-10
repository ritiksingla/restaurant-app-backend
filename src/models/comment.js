const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	rating: {
		type: Number,
		min: 1,
		max: 5
	},
	content: {
		type:String,
		maxLength: 100
	},
	author: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	dish: {
		type: mongoose.Types.ObjectId,
		ref: 'Dish'
	},
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;