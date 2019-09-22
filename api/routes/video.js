 'use strict';
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;


 var VideoSchema = new Schema({
 name: {
     type: String,
     required: 'Enter the name of the video'
   },
 publish_date: {
     type: Date,
     default: Date.now
   },
 brand: {
     type: String,
     default: 'group_nine'
   },
 views: {
     viewed: {
         type: Boolean,
         default: false
         },
     count: {
         type: String,
         default: '0'
       }
   }
 })


 module.exports = mongoose.model('Video', VideoSchema);