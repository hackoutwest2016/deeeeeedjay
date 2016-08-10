Template.home.onCreated(function() {
  this.autorun(() => {
    this.subscribe('GuestUpdates.all');
    
    var options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: ['user-read-email'] // Spotify access scopes.
    };
    Meteor.loginWithSpotify(options, function(err) {
      console.log(err || "No error");
      
      // Meteor.call('GuestUpdates.methods.getElvis', {}, (error, res) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log(res);
      //   }
      // });

      // Meteor.call('GuestUpdates.methods.getPlaylist', {}, (error, res) => {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     let random = Math.floor(Math.random() * (res.tracks.items.length -1) );
      //     let trackObj = res.tracks.items[random];
      //     $('#player').attr('src', trackObj.track.preview_url);
      //     console.log($('#player').attr('src'));
      //   }
      // });


      // Meteor.call('GuestUpdates.methods.createPlaylist', {}, (error, res) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log("Couldn't create playlist");
      //   }
      // });

    });
  });
});

Template.carousel.onRendered(() => {
  $('#carousel').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
  });
});

Template.currentGuests.helpers({
  getNumberOfGuests() {
    return getFieldAmount(GuestUpdates.find().fetch(), () => {
      return true;
    });
  },
});

Template.genderRatio.helpers({
  getNumberOfWomen() {
    return getFieldAmount(GuestUpdates.find().fetch(), (guestUpdate) => {
      return guestUpdate.gender === 'GENDER_FEMALE';
    });
  },
  getNumberOfMen() {
    return getFieldAmount(GuestUpdates.find().fetch(), (guestUpdate) => {
      return guestUpdate.gender === 'GENDER_MALE';
    });
  },
});

Template.nowPlaying.onCreated(function() {

  this.dict = new ReactiveDict();

  Meteor.call('GuestUpdates.methods.getPlaylist', {}, (error, res) => {
    if (error) {
      console.log(error);
    } else {
      let random = Math.floor(Math.random() * (res.tracks.items.length -1) );
      let trackObj = res.tracks.items[random];
      $('#player').attr('src', trackObj.track.preview_url);
      let name = (trackObj.track.name.split('- ')[1]);
      name = name ? name : trackObj.track.name;
      this.dict.set('currentTrack', name);
      this.dict.set('currentArtist', trackObj.track.artists[0].name);
    }
  });


  let time = 0;
  this.interval = Meteor.setInterval(() => {
    time++;
    if(time === 2) {
      Meteor.call('GuestUpdates.methods.getPlaylist', {}, (error, res) => {
        if (error) {
          console.log(error);
        } else {
          let random = Math.floor(Math.random() * (res.tracks.items.length -1) );
          let trackObj = res.tracks.items[random];
          $('#player').attr('src', trackObj.track.preview_url);
          let name = (trackObj.track.name.split('- ')[1]);
          name = name ? name : trackObj.track.name;
          this.dict.set('currentTrack', name);
          this.dict.set('currentArtist', trackObj.track.artists[0].name);
        }
      });
      time = 0;
    }
  },1000);
});

Template.nowPlaying.helpers({
  getCurrentTrack() {
    return Template.instance().dict.get('currentTrack') + ' - ' + Template.instance().dict.get('currentArtist');
  }
});

Template.ageRatio.helpers({
  getNumberOfTwenties() {
    const guestUpdates = GuestUpdates.find({ age: 'AGE_GROUP_1' }).fetch();
    let value = 0;
    _.each(guestUpdates, (guestUpdate) => {
      if (guestUpdate.value === 'INC') {
        value++;
      } else if (guestUpdate.value === 'DEC') {
        value--;
      }
    });
    return value;
  },
  getNumberOfThirties() {
    const guestUpdates = GuestUpdates.find({ age: 'AGE_GROUP_2' }).fetch();
    let value = 0;
    _.each(guestUpdates, (guestUpdate) => {
      if (guestUpdate.value === 'INC') {
        value++;
      } else if (guestUpdate.value === 'DEC') {
        value--;
      }
    });
    return value;
  },
});


function getFieldAmount(array, fun) {
  let currentAmount = 0;
  _.each(array, (item) => {
    const amount = item.value === 'INC' ? 1 : -1;
    currentAmount += fun(item) ? amount : 0;
  });

  return currentAmount;
}
