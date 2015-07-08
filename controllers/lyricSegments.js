'use strict';
console.log(process.env.GENIUS_ACCESS_TOKEN)
// // Instantiate a Genius instance:
// var Genius = require("node-genius");
// var geniusClient = new Genius(process.env.GENIUS_ACCESS_TOKEN);

// // Call functions on that instance:
// geniusClient.getSong("378195", function (error, song) {
//   if (error)
//     console.error("Whops. Something went wrong:", error);
//   else
//     console.log("Hoorah. Here is the song: ", song);
// });



// var url = require('url');
// var http = require('http');
// var query = 'it was all a dream'

// // var token = 'eyF9I1aj7okDeswapXQ332TtqpgwsNaYhRLfWfje_tJoUtSL4Zb0dV8US0M0He1n';

// var options = url.parse(process.argv[2] || 'https://api.genius.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=REQUESTED_SCOPE&state=SOME_STATE_VALUE&response_type=code' + query );

// // options.headers = {
// //   'Authorization': 'Token token=' + token
// // };


// http.get(options, function(response) {
//   var body = '';
//   var statusCode = response.statusCode;
//   console.log('Got status: ' + statusCode);
//   response.on('data', function(data){
//     // concats chunks of data as their received
//     body += data;
//   });
//   response.on('end', function(){
//     var parsed = JSON.parse(body);
//     console.log(parsed);
//   });
// }).on('error', function(e) {
//   console.log('Got error: ' + e.message);
// });
