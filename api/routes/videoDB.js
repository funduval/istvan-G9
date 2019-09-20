// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const env = require('dotenv').config()

// // Variable to be sent to Frontend with Database status
// let databaseConnection = 'Waiting for Database response...';

// router.get('/', function(req, res, next) {
//     res.send(databaseConnection);
// });

// // const dbURI = 'mongodb://localhost/videos';
// const dbAuth = env.DB_AUTH
// // const dockerDbURI = 'mongodb://mongodb:27017/test';

// // mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true
// //});

// mongoose.connect("mongodb://" + dbAuth + "@ds229878.mlab.com:29878/funda-test", { useNewUrlParser: true, useUnifiedTopology: true
// })

// // Connecting to MongoDB
// // mongoose.connect(dockerDbURI,{ useNewUrlParser: true, useUnifiedTopology: true
// // });
// // If there is a connection error send an error message
// mongoose.connection.on('error', error => {
//     console.log('Database connection error:', error);
//     databaseConnection = 'Error connecting to Database';
// });
// // If connected to MongoDB send a success message
// mongoose.connection.once('open', () => {
//     console.log('Connected to Database!');
//     databaseConnection = 'Connected to Database';
// });

// module.exports = router;