const express = require('express');
const mongodb = require('mongodb');
const fs = require('fs');
// const audiolength = require('mp3-duration');

const mongo = require('../helpers/mongo');
const loadTracksCollection = mongo.loadTracksCollection;

const loader = require('../helpers/loader');
const upload = loader.upload;

const router = express.Router();

// Get tracks collections
router.get('/', async (req, res) => {
	const tracks = await loadTracksCollection();
	res.send(await tracks.find({}).toArray());
});

// Add track
router.post('/', upload.single('trackfile'), async (req, res) => {
	var date = new Date().toLocaleString();
	const tracks = await loadTracksCollection();
	await tracks.insertOne({
		// user: xxx,
		name: req.body.trackname,
		size: req.file.size,
		// length: audiolength(req.file),
		date: date,
		path: req.file.path
	});
	res.status(201).send(await tracks.findOne({name: req.body.trackname, date: date}));
});

// Delete track
router.delete('/:id', async (req, res) => {
	const tracks = await loadTracksCollection();
	var id = new mongodb.ObjectID(req.params.id);
	var track = await tracks.findOne({ _id: id });
	fs.unlink(track.path, (err) => {
		if (err) {
			console.error(err);
			return ;
		}
		tracks.deleteOne({ _id: id });
	});
	res.status(200).send({});
});

module.exports = router;