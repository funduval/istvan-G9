var express = require('express');
var router = express.Router();
var Video = require('./video');
var Data = require('./data');

const mongoose = require("mongoose");


router.get('/', function(req, res) {
    Video.find({}, function(err, video) {
      if (err)
        res.send(err);
      res.json(video);
    });
 });

   

module.exports = router;