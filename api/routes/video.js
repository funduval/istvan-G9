 'use strict';
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;


 var VideoSchema = new Schema({
  name: {
     type: String,
     required:true,
     default: "This video belongs to Group Nine"
   },
  publish_date: {
     type: Date,
     required:true,
     default: Date.now
   },
  brand: {
     type: String,
     required:true,
     default: "group_nine"
   },
  viewed: {
       type: Boolean,
       required:true,
       default: false
  },
  count: {
       type: String,
       required:true,
       default: '0'
  }
 })


 module.exports = mongoose.model('Video', VideoSchema);