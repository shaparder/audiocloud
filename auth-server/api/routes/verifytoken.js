const jwt = require('jsonwebtoken');

// this function allows to create private route for users by being called on routes
module.exports = function (req, res, next) {
	var token = req.header('auth-token');

	if( !token ) return res.status(401).send('Acces denied');

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send('Invalid token');
	}
}