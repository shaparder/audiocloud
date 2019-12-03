// modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const api = require('./api/routes/tracks');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// redirect everything to the router
app.use('/api/tracks', api);

const port = process.env.PORT || 8081;
app.listen(port, (err) => {
	if (err) throw err;
	console.log('audio server:' + '\n' + 'http://localhost:' + port );
});

