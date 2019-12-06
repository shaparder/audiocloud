const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//external methods
const mongo = require('../databases/mongo');
const loadUsersCollection = mongo.loadUsersCollection;
const { registerValidation, loginValidation } = require('../databases/validation');

const router = express.Router();

// validating and registering a new user
router.post('/register', async (req, res) => {
	// get users collection
	const users = await loadUsersCollection();

	// validate data
	var { error } = registerValidation(req.body);
	if ( error ) return res.status(400).send(error.details[0].message);
 
	// check if user is already in database
	var emailExist = await users.findOne({ email: req.body.email });
	if ( emailExist ) return res.status(400).send('email already exists');

	// hash password
	var hashedPassword = await bcrypt.hash(req.body.password, 9);

	// get current date
	var date = new Date().toLocaleString();

	// save new user to database
	await users.insertOne({
		username: req.body.username,
		email: req.body.email, 
		password: hashedPassword,
		date: date
	});
	res.status(201).send(await users.findOne({ email: req.body.email, date: date }));
});

// validate and login user
router.post('/login', async (req, res) => {
	// get users collection
	const users = await loadUsersCollection();

	// validate data
	var { error } = loginValidation(req.body);
	if ( error ) return res.status(400).send('wrong credentials (validation)');

	// check if user email is correct
	var user = await users.findOne({ email: req.body.email });
	if ( !user ) return res.status(400).send('wrong credentials (email doesn\'t exist)');

	// check if password is correct
	var validPass = await bcrypt.compare(req.body.password, user.password);
	if ( !validPass ) return res.status(400).send('wrong credentials (incorrect password)');

	// create and assign token
	var token = jwt.sign({ _id: user._id, user: user.username }, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send(`logged in as ${user.username}`);

});

// verify token
router.post('/verify', (req, res) => {
	// get the token from the header
	var token = req.header('auth-token');

	// check if token exists
	if( !token ) return res.status(401).send('Acces denied');

	//check if token is correct
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		res.status(200).send('Acces granted')
	} catch (err) {
		res.status(400).send('Invalid token');
	}
});

module.exports = router;