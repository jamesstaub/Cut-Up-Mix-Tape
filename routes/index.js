var express = require('express');
var router = express.Router();
var env = require('node-env-file');
var path = require('path');


/********** genius api *********/
var token = process.env.GENIUS_ACCESS_TOKEN ||  env(path.join(__dirname, '../.env'));
// var searchQuery = 'i got something to say i killed your baby today  ';1
// Instantiate a Genius instance:
var Genius = require("node-genius");
var geniusClient = new Genius(process.env.GENIUS_ACCESS_TOKEN);




var searchGeniusPromise = function(searchQuery, transformData) {
  return new Promise(function(resolve, reject) {

    geniusClient.search(searchQuery, function(error, results) {
      if (error) {
        reject(error);
        // console.error("Whops. Something went wrong:", error);
      } else {
        var jsonResults = JSON.parse(results);

        // if there's a function as a second argument, use that to transform the data, otherwise just return the data
        var transformed = transformData instanceof Function ? transformData(jsonResults) : jsonResults;

        resolve(transformed);
      }
    });
  })
}

function getTitleArtist(results){
  var geniusResults = [];
  results.response.hits.forEach(function(h) {
    var song = {
      title: h.result.title,
      artist: h.result.primary_artist.name
    }
    geniusResults.push(song);
  });
  return geniusResults
}



function searchGenius(searchQuery){
  // invoking the above promise with a transformer function as the second argument.

  return searchGeniusPromise(searchQuery, getTitleArtist);
}

/* GET home page. */
router.get('/:query', function(req, res) {
  // res.render('index', { title: 'Express', user: req.user });

  searchGenius(req.params.query).then(function(songsArray){
    res.json(songsArray);
  })

});


module.exports = router;
