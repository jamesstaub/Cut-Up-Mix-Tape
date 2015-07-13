var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var lyricObjectSchema = new Schema({
  artist_name: {type: String, required: true},
  song_title: {type: String, required: true},
  genius_song_id: {type: Number, required: true}
});

var cutupSchema = new Schema({
  title: {type: String, required: true},
  created: { type: Date, default: Date.now },
  content: [lyricObjectSchema],
  // make virtual attributes for
    // stringified message
    // list of artists used
    // list of songs used
    // list of spotify song id's used

});


module.exports = mongoose.model('Cutup', cutupSchema);
