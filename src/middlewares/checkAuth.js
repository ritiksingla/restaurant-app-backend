const jwt = require('jsonwebtoken');
const env = require('dotenv');
const HttpStatusCode = require('../HttpStatusCode');

env.config({ path: "../config.env" });

exports.checkAuth = function(req, res, next) {
	// check backend
	// const cookie = req.cookie.jwt;
	// if (cookie) {
	// 	jwt.verify(cookie, process.env.SECRET, function(err, decoded) {
	// 		if(err) {
	// 			return res.status(HttpStatusCode.Forbidden).send({
	// 				error: 'cookie mismatch'
	// 			});
	// 		}
	// 		console.log(decoded);
	// 		next();
	// 	})
	// } else {
	// 	return res.status(HttpStatusCode.Forbidden).send({
	// 		error: 'cookie expired'
	// 	});
	// }

	// check frontend
	if (!req.header('authorization'))
		return res.status(HttpStatusCode.Unauthorized).send({ error: 'Unauthorized. Missing auth token' });
	const token = req.header('authorization').split(' ')[1];
	jwt.verify(token, process.env.SECRET, function(err, decoded) {
		if (err || !decoded.id) {
			return res.status(HttpStatusCode.Unauthorized).send({ error: 'Unauthorized. auth token invalid' });
		}
		req.id = decoded.id;
		next();
	})
};