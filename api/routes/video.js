'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VideoSchema = new Schema({
     name: {
          type: String,
          default: "This video belongs to Group Nine"
     },
     publish_date: {
          type: Date,
          default: Date.now
     },
     brand: {
          type: String,
          default: "group_nine"
     },
     viewed: {
          type: Boolean,
          default: false
     },
     count: {
          type: String,
          default: '0'
     }
})


module.exports = mongoose.model('Video', VideoSchema);