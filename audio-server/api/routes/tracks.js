const express = require('express');
const fs = require('fs');
// const audiolength = require('mp3-duration');

const mongo = require('../databases/mongo');
const loadTracksCollection = mongo.loadTracksCollection;

const loader = require('../helpers/loader');
const upload = loader.upload;

const router = express.Router();

// Get list of tracks
router.get('/', async (req, res) => {
	const tracks = await loadTracksCollection();
	res.send(await tracks.find({}).toArray());
});

// Upload track
router.post('/', upload.single('trackfile'), async (req, res) => {
	var date = new Date().toLocaleString();
	const tracks = await loadTracksCollection();
	await tracks.insertOne({
		user: req.body.username,
		name: req.body.trackname,
		size: req.file.size,
		// length: audiolength(req.file),
		date: date,
		path: req.file.path,
		downloadCount: 0
	});
	res.status(201).send(await tracks.findOne({ name: req.body.trackname, date: date }));
});

// Download track
router.get('/download/:id', async (req, res) => {
	const tracks = await loadTracksCollection();
	var id = new mongodb.ObjectID(req.params.id);
	var track = await tracks.findOne({ _id: id });
	res.download(track.path, track.name + '.mp3', (err) => {
		if (err) { console.error(err); return ; }
		tracks.updateOne({ _id: id }, { $inc: {downloadCount: 1}});
	});
});

// Delete track
router.delete('/delete/:id', async (req, res) => {
	const tracks = await loadTracksCollection();
	var id = new mongodb.ObjectID(req.params.id);
	var track = await tracks.findOne({ _id: id });
	fs.unlink(track.path, (err) => {
		if (err) { console.error(err); return ; }
		tracks.deleteOne({ _id: id });
	});
	res.status(200).send({});
});

module.exports = router;