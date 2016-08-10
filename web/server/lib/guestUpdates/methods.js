
GuestUpdates.methods.getElvis = new ValidatedMethod({
  name: 'GuestUpdates.methods.getElvis',

  validate: new SimpleSchema().validator(),
  run() {

    const spotifyApi = new SpotifyWebApi();

    // Get Elvis' albums
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', { limit: 10, offset: 20 }, function(err, data) {
      if (err) {
        console.error('Something went wrong!');
      } else {
        console.log(data.body);
      }
    });
  },
});

GuestUpdates.methods.getTracksFromYear = new ValidatedMethod({
  name: 'GuestUpdates.methods.getTracksFromYear',

  validate: new SimpleSchema({
    yearInterval: { type: String },
    limit: { type: Number } 
  }).validator(),

  run({ yearInterval, limit }) {
    const spotifyApi = new SpotifyWebApi();

    let response = spotifyApi.searchTracks('year:'+yearInterval, {limit});
    
    return response.data;
  }
})