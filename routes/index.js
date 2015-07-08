var express = require('express');
var router = express.Router();
var env = require('node-env-file');
var path = require('path');


/********** genius api *********/
var token = process.env.GENIUS_ACCESS_TOKEN ||  env(path.join(__dirname, '../.env'));
var searchQuery = 'i got something to say i killed your baby today';
// Instantiate a Genius instance:
var Genius = require("node-genius");
var geniusClient = new Genius(process.env.GENIUS_ACCESS_TOKEN);

// Call functions on that instance:
var geniusResults = [];
geniusClient.search(searchQuery, function (error, results) {
  if (error)
    console.error("Whops. Something went wrong:", error);
  else
    var jsonResults = JSON.parse(results);
    jsonResults.response.hits.forEach(function(h){
      var song = { title: h.result.title, artist: h.result.primary_artist.name }
      geniusResults.push(song);
    });

});


/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express', user: req.user });
  res.json(geniusResults);
});


module.exports = router;
