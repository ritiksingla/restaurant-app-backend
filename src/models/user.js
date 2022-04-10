const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		maxLength: 100
	},
	first_name: {
		type: String,
		required: true,
		maxLength: 20
	},
	last_name: {
		type: String,
		required: true,
		maxLength: 20
	},
	password: {
		type: String,
		required: true,
		minLength: 4,
		maxLength: 20
	}
});

userSchema.pre('save', function(next) {
	const salt = bcrypt.genSaltSync(10);
	this.password = bcrypt.hashSync(this.password, salt);
	next();
});

userSchema.statics.login = async function(email, password) {
	const user = await User.findOne({ email });
	if (user) {
		const auth = bcrypt.compareSync(password, user.password);
		if (auth) {
			return { user:user, error:''};
		} else {
			return {
				user:'',
				error: 'password or email is incorrect'
			};
		}
	} else {
		return {
			user:'',
			error: 'password or email is incorrect'
		};
	}
};

const User = mongoose.model('User', userSchema);
module.exports = User;