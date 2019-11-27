const mongodb = require('mongodb')

// to connect with compass: mongodb+srv://shp:root@audiocloud-dev-axyhz.mongodb.net/test

// database url using mongodb atlas
const db_url = 'mongodb+srv://shp:root@audiocloud-dev-axyhz.mongodb.net/test?retryWrites=true&w=majority';

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