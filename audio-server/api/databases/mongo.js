const mongodb = require('mongodb');

const url = process.env.DB_URL;
const usr = process.env.DB_USR;
const pwd = process.env.DB_PWD;
// to connect with compass: mongodb+srv://[usr]:[pwd]@audiocloud-dev-axyhz.mongodb.net/test

// database url using mongodb atlas
const db_url = `mongodb+srv://${usr}:${pwd}@${url}`;

// Load track collection
async function loadTracksCollection(){
	const client = await mongodb.MongoClient.connect(
		db_url,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true
		}
	);
	return client.db('audiocloud-dev').collection('tracks');
}

module.exports = {
	loadTracksCollection: loadTracksCollection
}