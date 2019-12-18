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
  console.log(req.body);
  
	// get users collection
	const users = await loadUsersCollection();

	// validate data
	var { error } = registerValidation(req.body);
  if ( error ) return res.status(400).send(error.details[0].message);
 
	// check if user is already in database
	var emailExist = await users.findOne({ email: req.body.email });
	if ( emailExist ) return res.status(400).send('Email already exists');

	// chec if username already exists
	var usernameExist = await users.findOne({ username: req.body.username });
	if ( usernameExist) return res.status(400).send('Username is already taken');

	// hash password
	var hashedPassword = await bcrypt.hash(req.body.password, 9);

	// get current date
	var date = new Date().toLocaleString();

  // save new user to database
  try {
    await users.insertOne({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      fullname: req.body.firstname + ' ' + req.body.lastname,
      username: req.body.username,
      email: req.body.email, 
      password: hashedPassword,
      date: date
    });
    res.status(201).send(`Succesfully created ${req.body.username} account !`);
  } catch (err) {
    console.log(err);
    res.status(400).send('A problem occured when creating user')
  }
});

// validate and login user
router.post('/login', async (req, res) => {
  console.log(req.body);

	// validate data
	var { error } = loginValidation(req.body);
	if ( error ) return res.status(400).send('Wrong credentials (validation)');

	// get users collection
	const users = await loadUsersCollection();

	// check if user email is correct
	var user = await users.findOne({ email: req.body.email });
	if ( !user ) return res.status(400).send('Wrong credentials (email doesn\'t exist)');

	// check if password is correct
	var validPass = await bcrypt.compare(req.body.password, user.password);
  if ( !validPass ) return res.status(400).send('Wrong credentials (email and password don\'t match)');
  
  // get username
  const username = user.username;

	// create and assign token
	var token = jwt.sign({ _id: user._id, user: user.username }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 });
	res.set({'token': token, 'username': username}).status(200).send(`Logged in as ${username}`);
 res.hea
});

// verify token
router.get('/verify', (req, res) => {
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

// get users list
router.get('/userslist', async (req, res) => {
	// get users collection
  const users = await loadUsersCollection();
  // return only username
  return res.send(await users.find({}).project({'username': 1, '_id': 0}).toArray());
})

module.exports = router;