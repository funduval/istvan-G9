var express = require('express');
var router = express.Router();
var Video = require('./video');


const mongoose = require("mongoose");


router.get('/', function (req, res) {
  Video.find({}, function (err, video) {
    if (err)
      res.send(err);
    res.json(video);
  });
});


router.get('/getVideos', function (req, res) {
  Video.find({}, function (err, video) {
    if (err)
      res.send(err);
    res.json(video);
  });
});


router.post('/createVideo', (req, res) => {

  var new_video = new Video(req.body);
  new_video.save(function (err, video) {
    if (err)
      res.send(err);
    res.json(video);
  });
});



router.post('/updateVideo', (req, res) => {
  const { name, publish_date, brand } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete('/deleteVideo', (req, res) => {
  Video.remove(req.params, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

module.exports = router;
