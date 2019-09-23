const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const env = require('dotenv').config()
const Video = require("./video")
const bodyParser = require("body-parser");
const logger = require("morgan");
const dbAuth = process.env.DB_AUTH;


let databaseConnection = 'Waiting for Database response...';


mongoose.connect("mongodb://"+ dbAuth +"@ds229878.mlab.com:29878/funda-test", {
    useNewUrlParser: true, useUnifiedTopology: true
})


mongoose.connection.on('error', error => {
    console.log('Database connection error:', error);
    databaseConnection = 'Error connecting to Database';
});


mongoose.connection.once('open', () => {
    console.log('Connected to Database!');
    databaseConnection = 'Connected to Database';
});




module.exports = router;