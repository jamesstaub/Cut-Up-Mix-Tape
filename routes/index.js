var express = require('express');
var router = express.Router();
var env = require('node-env-file');
var path = require('path');
var fuzzy = require('fuzzy-filter')

/********** genius api *********/
var token = process.env.GENIUS_ACCESS_TOKEN ||  env(path.join(__dirname, '../.env'));

// Instantiate a Genius instance:
var Genius = require("node-genius");
var geniusClient = new Genius(process.env.GENIUS_ACCESS_TOKEN);


// makes a search request to Genius API
var searchGeniusPromise = function(searchQuery, transformer) {
  return new Promise(function(resolve, reject) {
    // hacked the node-genius npm module to allow per_page length as optional second argument of .search method. evenutally could clean up and make less hacky.
    geniusClient.search(searchQuery, 8, function(error, results) {
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
// function listResults(results){
//   var geniusResults = [];
//   results.response.hits.forEach(function(h) {
//     var song = {
//       title: h.result.title,
//       artist: h.result.primary_artist.name
//     }
//     geniusResults.push(song);
//   });
//   return geniusResults
// }


function referantsByID(results) {
  var referentPromises = [];

  // iterate over each result from the search query
  results.response.hits.forEach(function(h) {

    var id = h.result.id;
    var songData = new Promise(function(resolve, reject) {
      // also hacked the node-genius module to include getReferents method
      geniusClient.getReferents(id, function(error, segment) {
        if (error) {
          console.log('failed to get referent');
          reject(error);

        } else {
          //
          var jsonResults = JSON.parse(segment);
          var lyricsArray = [];
          // each object in the array of lyric segments needs to containthe song info to keep it associated in the front end cutup
          jsonResults.response.referents.forEach(function(r){
            lyricsArray.push(r.fragment);
          })
          // lyrics array is the final, clean array of lyric segments, resolve promise with the lyrics and song meta
          resolve(
            {
              id: h.result.id,
              title : h.result.title,
              artist : h.result.primary_artist.name,
              artist_img : h.result.primary_artist.image_url,
              lyrics : lyricsArray
          });
        }
      }) //end geniusClient.getReferants request
    });
    // console.log(songData)
    referentPromises.push(songData);

  })
  return referentPromises;
}

function searchGenius(searchQuery, transformer){
  // invoking the above promise with a transformer function as the second argument.
  return searchGeniusPromise(searchQuery, transformer);
}

// apply fuzzy filtering to the lyrics array search results
function filterLyrics(searchQuery, songsArray){
  return songsArray.map(function(song){
    // console.log(song);
    var filteredSong = {
          title: song.title,
          artist: song.artist,
          id: song.id,
          lyrics: fuzzy(searchQuery, song.lyrics)
        }

    if(filteredSong.lyrics.length){
      return filteredSong;
    }
  })
}

// reformats song results into an array that can be consumed by the front end drang and drop
function packageLyricSegments(songsArray){
  var lyricsArray = []
  songsArray.forEach(function(song){
// console.log("--log for each song")
// console.log(song)
 // song must be truthy for the foreach to run
    song && song.lyrics.forEach(function(lyric){
      lyricsArray.push({
          lyric:lyric,
          title: song.title,
          artist: song.artist,
          id: song.id
        })
    })
  })
  // console.log(lyricsArray);
  return lyricsArray;
}

/* GET home page. */
// router.get('/listsongs/:query', function(req, res) {
//   searchGenius(req.params.query, listResults).then(function(songsArray){
//     res.json(songsArray);
//   })
// });

/* GET home page. */
router.get('/stanzas/:query', function(req, res) {

  // invoke the initial search request, whith the transformer argument function which makes further requests
  searchGenius(req.params.query, referantsByID).then(function(promiseResults){

    return Promise.all(promiseResults)
  }).then(function(songsResultsArray){
    // console.log(songsResultsArray);
    // console.log(packageLyricSegments(filterLyrics(req.params.query, songsResultsArray)));
      var filteredResults = packageLyricSegments(filterLyrics(req.params.query, songsResultsArray));
      res.json(filteredResults);
    }).catch(function(err){
      console.error(err);
      res.sendStatus(err);
    })
});


module.exports = router;


