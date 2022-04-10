const { dishCategories, dishLabels, Dish } = require('../models/dish');
const User = require('../models/user');
const Comment = require('../models/comment');

exports.getCategories = function(req, res) {
	return res.send(dishCategories);
}

exports.getLabels = function(req, res) {
	return res.send(dishLabels);
}

exports.getDishes = async (req, res) => {
	try {
		let dishes = await Dish.find().populate('user').populate('comments');
		return res.send({ dishes, error: '' });
	} catch (error) {
		return res.status(500).send({ dishes: '', error });
	}
};

exports.getDish = async (req, res) => {
	try {
		let dish = await Dish.findById(req.params.id).populate('user').populate('comments');
		return res.send(dish);
	} catch (error) {
		return res.status(400).send(error);
	}
};

exports.postDish = async (req, res) => {
	const { name, imageUrl, category, label, price, description, user } = req.body;
	try {
		let dish = new Dish({
			name,
			imageUrl,
			category,
			label,
			price,
			description,
			averageRating: 0,
			user,
			comments: []
		});
		dish = await dish.save();
		if(dish) {
			dish.populate('user');
			return res.send({ dish, error: '' });
		} else {
			return res.send({
				dish: '',
				error: 'database error'
			});
		}
	} catch (error) {
		return res.send({ dish: '', error });
	}
};

exports.deleteDish = async (req, res) => {
	try {
		let dish = await Dish.findByIdAndDelete({ _id: req.params.id });
		for (let i = 0; i < dish.comments.length; ++i) {
			await Comment.findByIdAndDelete(dish.comments[i]);
		}
		return res.send({ dish, error: '' });
	} catch (error) {
		return res.send({ dish: '', error });
	}
};

exports.updateDish = async (req, res) => {
	let updates = {};
	Object.keys(req.body).forEach(key => {
		updates[key] = req.body[key];
	});
	try {
		let dish = await Dish.findByIdAndUpdate({ _id: req.params.id }, { $set: updates }, { new: true });
		dish.populate('user').populate('comments');
		return res.send({ dish, error: '' });
	} catch (error) {
		return res.send({ dish: '', error });
	}
};


exports.getComments = async (req, res) => {
	try {
		let comments = await Comment.find().populate('author');
		return res.send({
			comments,
			error: ''
		});
	} catch (error) {
		return res.send({
			comments: '',
			error
		});
	}
};

exports.postComment = async (req, res) => {
	const { userId, rating, content } = req.body;
	try {
		let dish = await Dish.findById({ _id: req.params.id });
		let comment = new Comment({ rating, content, author: userId, dish: req.params.id });
		await comment.save();
		dish.comments.push(comment);
		dish = await dish.save();
		return res.send({
			comment,
			error: ''
		});
	} catch (error) {
		return res.send({
			comment: '',
			error
		});
	}
};

// automatically deletes from mapped dish
exports.deleteComment = async (req, res) => {
	const commentId = req.params.id;
	try {
		let comment = await Comment.findByIdAndDelete({ _id: commentId });
		return res.send({ comment, error: '' });
	} catch (error) {
		return res.send({ comment: '', error });
	}
};