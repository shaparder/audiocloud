// modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const api = require('./api/routes/users');

// middleware
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// redirect everything to the router
app.use('/api/users', api);

const port = process.env.PORT || 8082;
app.listen(port, (err) => {
	if (err) throw err;
	console.log( 'authentication server: ' + "\x1b[31m%s\x1b[0m", "http://localhost:" + port + "/api/users");
});

