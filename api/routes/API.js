var express = require('express');
var router = express.Router();
var Video = require('./video');


const mongoose = require("mongoose");


router.get('/', function(req, res) {
    Video.find({}, function(err, video) {
      if (err)
        res.send(err);
      res.json(video);
    });
 });


 router.get('/getVideos', function(req, res) {
  Video.find({}, function(err, video) {
    if (err)
      res.send(err);
    res.json(video);
  });
});


router.post('/createVideo', (req, res) => {
  var new_video = new Video();
  const { name, publish_date, brand } = req.body;

  new_video.name = name;
  new_video.publish_date = publish_date;
  new_video.brand = brand;

  new_video.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

module.exports = router;
