var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cutup-mixtape');

var Cutup = require('../models/cutup.js');

async.series([
    function(done) {
      Cutup.remove({}, done);
    },
    function(done) {
      Cutup.create({
        title: "test cutup title",
        content: [{
          song_title: "butter pecan",
          artist_name: "bobby digital",
          genius_song_id: 12345
        },
        {
          song_title: "dirty mef",
          artist_name: "method man",
          genius_song_id: 24356
        }]
      }, done);
    },
    function(done) {
      Cutup.create({
        title: "second test cutup ",
        content: [{
          song_title: "shadowboxin",
          artist_name: "gza",
          genius_song_id: 12345
        },
        {
          song_title: "fishscale",
          artist_name: "ghost face killa",
          genius_song_id: 24356
        }]
      }, done);
    }
  ],

  function(error, res) {
    if (error) {
      console.error(error);
    }
    console.log(res)
    mongoose.disconnect();
  }
);
