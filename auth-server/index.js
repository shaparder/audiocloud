// modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const api = require('./api/routes/users');

const corsOptions = {
  exposedHeaders: ['token', 'username'],
};

// middleware
app.disable('x-powered-by');
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// redirect everything to the router
app.use('/api/users', api);

const port = process.env.PORT || 8082;
app.listen(port, (err) => {
	if (err) throw err;
  console.log('start time: ' + Date(Date.now()).toLocaleString('en-GB'));
	console.log( 'authentication server: ' + "\x1b[33m%s\x1b[0m", "http://localhost:" + port + "/api/users");
});

