// modules
const express = require('express');
const cors = require('cors');

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
	console.log('server listening here:' + '\n' + 'http://localhost:' + port );
});

