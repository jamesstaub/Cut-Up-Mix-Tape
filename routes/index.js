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




var searchGeniusPromise = function(searchQuery, transformer) {
  return new Promise(function(resolve, reject) {
    // hacked the node-genius npm module to allow per_page length as optional second argument of .search method. evenutally could clean up and make less hacky.
    geniusClient.search(searchQuery, 5, function(error, results) {
      if (error) {
        reject(error);
        // console.error("Whops. Something went wrong:", error);
      } else {
        var jsonResults = JSON.parse(results);

        // if there's a function as a second argument, use that to transform the data, otherwise just return the data
        var transformed = transformer instanceof Function ? transformer(jsonResults) : jsonResults;
        resolve(transformed);
      }
    });
  })
}

// transformer functions to filter the results of the genius search request

// list title and artist of the search results
function listResults(results){
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

// list songs Ids of search results, these get fed into a referants request
function referantsByID(results) {
  var referentPromises = [];
  results.response.hits.forEach(function(h) {
    var id = h.result.id;
    referentPromises.push(new Promise(function(resolve, reject) {
      // also hacked the node-genius module to include getReferents method
      geniusClient.getReferents(id, function(error, segment) {
        if (error) {
          reject(error);
          // console.error("Whops. Something went wrong:", error);
        } else {
          var jsonResults = JSON.parse(segment);
          var lyricsArray = []
          jsonResults.response.referents.forEach(function(r){
            lyricsArray.push(r.fragment);
          })
          // lyrics array is the final, clean array of lyric segments
          resolve(lyricsArray);
        }
      }) //end geniusClient.getReferants
    }))
      // call it with Promise.all(referantsByID() )
  })
  return referentPromises
}

function searchGenius(searchQuery, transformer){
  // invoking the above promise with a transformer function as the second argument.
  return searchGeniusPromise(searchQuery, transformer);
}

/* GET home page. */
router.get('/list/:query', function(req, res) {
  searchGenius(req.params.query, listResults).then(function(songsArray){
    res.json(songsArray);
  })
});

/* GET home page. */
router.get('/segmets/:query', function(req, res) {
  searchGenius(req.params.query, referantsByID).then(function(lyricsArray){
    return Promise.all(lyricsArray)
  }).then(function(songsResponse){
      res.json(songsResponse);
    }).catch(function(err){
      console.error(err);
      res.json(err);
    })
});


module.exports = router;
