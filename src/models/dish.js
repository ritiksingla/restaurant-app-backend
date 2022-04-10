const mongoose = require('mongoose');

const dishCategories = [
'pizza', 'burger', 'sweets', 'seafood', 'chineese', 'italian', 'café',
'cake', 'pasta', 'bakery', 'bar', 'sushi'];
exports.dishCategories = dishCategories;

const dishLabels = [
'sweet','spicy','hot','cold','low sugar','low fat', 'high calories','veg','non-veg',
'best seller'
];

exports.dishLabels = dishLabels;

const dishSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		maxLength: 20,
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	},
	category: {
		type: String,
		enum: dishCategories,
		required: true,
	},
	label: {
		type: String,
		enum: dishLabels,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		min: 0
	},
	description: {
		type: String,
		maxLength: 100
	},
	averageRating: {
		type: Number,
		min: 0,
		max: 5
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true
	},
	comments: {
		type: [mongoose.Types.ObjectId],
		ref: 'Comment'
	}
});

exports.Dish = mongoose.model('Dish', dishSchema);