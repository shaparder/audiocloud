const express = require('express');
const mongodb = require('mongodb');
const fs = require('fs');
// const audiolength = require('mp3-duration');

// import mongodb helpers
const mongo = require('../databases/mongo');
const loadTracksCollection = mongo.loadTracksCollection;

// import multer storage options
const loader = require('../helpers/loader');
const upload = loader.upload;

const router = express.Router();

// Get list of tracks
router.get('/load', async (req, res) => {
  // load track collection
  const tracks = await loadTracksCollection();
  // send tracks matching query (all of them if empty query)
  if (Object.keys(req.query.query).length === 0){ 
    return res.send(await tracks.find({}).toArray());
  } else {
    var regex = new RegExp(req.query.query, "gi");
    var search = { $or: [{ name: regex }, { user: regex }] };
    return res.send(await tracks.find(search).toArray());
  }
});

// Upload new track
router.post('/upload', async (req, res) => {
  // multer upload of the track
  upload(req, res, (err) => {
    if (err) return res.status(400).send('A problem occured when uploading the file');
  })
  // get actual date
  var date = new Date();
  // load track collection
  const tracks = await loadTracksCollection();
  try {
    await tracks.insertOne({
      user: req.body.username,
      name: req.body.trackname,
      desc: req.body.description,
      type: req.body.typefile,
      size: req.file.size,
      // length: audiolength(req.file),
      date: date,
      dDay: date.toDateString(),
      path: req.file.path,
      downloadCount: 0
    });
    res.status(201).send('The file was sucessfully uploaded !');
  } catch (err) {
    console.error(err);
    return res.status(400).send('A problem occured when storing file data');
  }
});

// Download track
router.get('/download/:id', async (req, res) => {
  const tracks = await loadTracksCollection();
  var id = new mongodb.ObjectID(req.params.id);
  var track = await tracks.findOne({ _id: id });
  var trackPath = String(track.path);
  var trackName = String(track.user + ' - ' + track.name + '.mp3');
  res.download(trackPath, trackName, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).send('Could\'t find file in server');
    } else {
    tracks.updateOne({ _id: id }, { $inc: { downloadCount: 1 } });
    }
  });
});

// Delete track
router.delete('/delete/:id', async (req, res) => {
  const tracks = await loadTracksCollection();
  var id = new mongodb.ObjectID(req.params.id);
  var track = await tracks.findOne({ _id: id });
  fs.unlink(track.path, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).send('A problem occured trying to delete the file ...');
    }
    try {
      tracks.deleteOne({ _id: id });
      return res.status(200).send();
    } catch (err) {
      console.error(err);
      return res.status(400).send('A problem occured trying to delete info from database ...')
    }
  });
});

module.exports = router;