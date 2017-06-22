const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./api/config/router');
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://wedding-rsvp-dbuser:moisthebest123@ds129352.mlab.com:29352/heroku_xlc2r06h';
var PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI, function (err) {
  if (err) {
    console.error('Could not connect to Mongo: err:', err);
    process.exit(1);
  }
  console.log('Connected to database:', mongoose.connection.name);
});


app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.listen(PORT, function(){
  console.log('app is listening on port', PORT);
});

module.exports = app;
