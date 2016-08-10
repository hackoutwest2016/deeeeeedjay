
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


GuestUpdates.methods.createPlaylist = new ValidatedMethod({
  name: 'GuestUpdates.methods.createPlaylist',

  validate: new SimpleSchema().validator(),
  run() {

    const spotifyApi = new SpotifyWebApi();

    spotifyApi.createPlaylist(Meteor.user().services.spotify.id, 'My Cool Playlist', { public : false }, function(err, data) {
      if (err) {
        console.error("Couldn't create playlist");
      } else {
        console.log(data.body);
      }
    });
  },
});

GuestUpdates.methods.getPlaylist = new ValidatedMethod({
  name: 'GuestUpdates.methods.getPlaylist',

  validate: new SimpleSchema().validator(),
  run() {

    const spotifyApi = new SpotifyWebApi();
    let response = spotifyApi.getPlaylist('spotify', '0fl40ep4Wp427G5dmYpZtK', { limit : 5, offset : 10 });
    
    return response.data.body;
  },
});

