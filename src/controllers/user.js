const User = require('../models/user');
const jwt = require('jsonwebtoken');
const env = require('dotenv');

env.config({ path: "../config.env" });
const options = {
	algorithm: 'HS256',
	expiresIn: '5d'
};

exports.getUsers = function(req, res) {
	User.find(function(err, users) {
			return res.send(users);
	});
};


exports.getUser = function(req, res) {
	User.findOne({ _id: req.params.id }, function(err, user) {
		if (err) {
			return res.send({
				user: '',
				error: 'database error'
			});
		}
		if (user) {
			return res.send({
				user: user,
				error: ''
			});
		} else {
			return res.send({
				user: '',
				error: 'invalid user id'
			});
		}
	});
};

exports.registerUser = async (req, res) => {
	const { first_name, last_name, email, password } = req.body;
	User.findOne({ email: email }, '_id', async (err, doc) => {
		if (err) {
			return res.send({
				user: '',
				error: err
			});
		}
		if (doc) {
			return res.send({
				user: '',
				error: 'user with that email already exists'
			});
		} else {
			try {
				let user = new User({ first_name, last_name, email, password });
				user = await user.save();
				if (user) {
					return res.send({
						user: user,
						error: ''
					});
				} else {
					return res.send({
						user: '',
						error: 'database error'
					});
				}
			} catch (error) {
				return res.send({
					user: '',
					error
				});
			}
		}
	});
};

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const data = await User.login(email, password);
		if (data.error.length === 0) {
			const user = data.user;
			jwt.sign({ id: user._id }, process.env.SECRET, options, function(err, token) {
				if (err) {
					return res.send({
						user: '',
						jwt: '',
						error: 'token error'
					});
				} else {
					return res.send({
						user: user,
						jwt: token,
						error: ''
					});
				}
			});
		} else {
			return res.send({
				user: '',
				jwt: '',
				error: data.error
			});
		}
	} catch (error) {
		return res.send({
			user: '',
			jwt: '',
			error
		});
	}
};

exports.updateUser = async (req, res) => {
	let updates = {};
	Object.keys(req.body.user).forEach(key => {
		updates[key] = req.body.user[key];
	});
	try {
		if(updates.email) {
			let user = await User.findOne({email: updates.email});
			if(user) {
				return res.send({
					user: '',
					error: 'user with that email already exists'
				});
			}
		}
		let user = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: updates }, { new: true });
		return res.send({ user, error: '' });
	} catch (error) {
		return res.send({ user: '', error });
	}
};