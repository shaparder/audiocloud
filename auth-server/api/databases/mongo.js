const mongodb = require('mongodb');

// database url using mongodb atlas
const db_url = process.env.DB_URL;

// Load track collection
async function loadUsersCollection(){
	const client = await mongodb.MongoClient.connect(
		db_url,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true
		}
	);
	return client.db('audiocloud-dev').collection('users');
}

module.exports.loadUsersCollection = loadUsersCollection;