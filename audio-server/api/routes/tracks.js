const express = require('express');
const mongodb = require('mongodb');
const fs = require('fs');
// const audiolength = require('mp3-duration');

const mongo = require('../databases/mongo');
const loadTracksCollection = mongo.loadTracksCollection;

const loader = require('../helpers/loader');
const upload = loader.upload;

const router = express.Router();

// Get list of tracks
router.get('/load', async (req, res) => {
  const tracks = await loadTracksCollection();
  if (Object.keys(req.query.query).length === 0){ 
    return res.send(await tracks.find({}).toArray());
  } else {
    var regex = new RegExp(req.query.query, "gi");
    var search = { $or: [{ name: regex }, { user: regex }] };
    return res.send(await tracks.find(search).toArray());
  }
});

// Upload track
router.post('/upload', upload.single('trackfile'), async (req, res) => {
  var date = new Date();
  const tracks = await loadTracksCollection();
  try {
    await tracks.insertOne({
      user: req.body.username,
      name: req.body.trackname,
      size: req.file.size,
      type: req.body.type,
      // length: audiolength(req.file),
      date: date,
      dDay: date.toDateString(),
      path: req.file.path,
      downloadCount: 0
    });
    res.status(201).send('The file was sucessfully uploaded !');
  } catch (err) {
    console.error(err);
    return res.status(400).send('A problem occured trying to add info from database ...');
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
      return ;
    } else {
    tracks.updateOne({ _id: id }, { $inc: { downloadCount: 1 } });
    // return res.status(200).send('The download should start ...')
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