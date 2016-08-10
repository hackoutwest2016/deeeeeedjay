const AGE_GROUP_1 = 20;
const AGE_GROUP_2 = 30;
const AGE_GROUP_3 = 40;
const AGE_GROUP_4 = 50;
const AGE_GROUP_5 = 60;

Template.home.onCreated(function() {
  this.autorun(() => {
    this.subscribe('GuestUpdates.all');
    
    var options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: ['user-read-email'] // Spotify access scopes.
    };
    Meteor.loginWithSpotify(options, function(err) {
      console.log(err || "No error");

      let currentAgeGroup = getCurrentAgeGroup();
      let trackIds = getTrackIdsFromAgeGroup(currentAgeGroup, 10)
    });
  });
});


Template.carousel.onRendered(() => {
  $('#carousel').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
  });
});

Template.carousel.helpers({
  guestAmount() {
    console.log(Session.get('currentNumberOfGuests'));
    return 'lounge';
  },
  ageGroup() {
    let templateName;
    switch(Session.get('currentAgeGroup')) {
      case 'AGE_GROUP_1':
        templateName = 'loungeOne';
        break;
      case 'AGE_GROUP_2':
        templateName = 'loungeTwo';
        break;
      case 'AGE_GROUP_3':
        templateName = 'loungeThree';
        break;
      case 'AGE_GROUP_4':
        templateName = 'loungeFour';
        break;
      case 'AGE_GROUP_5':
        templateName = 'loungeFive';
        break;
    }
    return templateName;
  },
  getAgeGroupAmount(ageString) {
    const inc = GuestUpdates.find({ age: ageString, value: 'INC' }).count();
    const dec = GuestUpdates.find({ age: ageString, value: 'DEC' }).count();
    return inc - dec;
  },
});

Template.loungeOne.inheritsHelpersFrom('carousel');
Template.loungeTwo.inheritsHelpersFrom('carousel');
Template.loungeThree.inheritsHelpersFrom('carousel');
Template.loungeFour.inheritsHelpersFrom('carousel');
Template.loungeFive.inheritsHelpersFrom('carousel');

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

  // Session = new ReactiveDict();
  let currentAgeGroup = getCurrentAgeGroup();
  let trackIds = getTrackIdsFromAgeGroup(currentAgeGroup, 10);

  Meteor.call('GuestUpdates.methods.getPlaylist', {}, (error, res) => {
    if (error) {
      console.log(error);
    } else {
      let random = Math.floor(Math.random() * (res.tracks.items.length -1) );
      let trackObj = res.tracks.items[random];

      console.log(getCurrentAgeGroup());

      $('#player').attr('src', trackObj.track.preview_url);
      let name = (trackObj.track.name.split('- ')[1]);
      name = name ? name : trackObj.track.name;
      Session.set('currentTrack', name);
      Session.set('currentArtist', trackObj.track.artists[0].name);

      random = Math.floor(Math.random() * (res.tracks.items.length -1) );
      let nextTrackObj = res.tracks.items[random];
      let nextName = (nextTrackObj.track.name.split('- ')[1]);
      nextName = nextName ? nextName : nextTrackObj.track.name;
      Session.set('nextTrack', nextName);
      Session.set('nextArtist', nextTrackObj.track.artists[0].name);
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

          console.log(getCurrentAgeGroup());

          $('#player').attr('src', trackObj.track.preview_url);
          let name = (trackObj.track.name.split('- ')[1]);
          name = name ? name : trackObj.track.name;
          Session.set('currentTrack', name);
          Session.set('currentArtist', trackObj.track.artists[0].name);

          random = Math.floor(Math.random() * (res.tracks.items.length -1) );
          let nextTrackObj = res.tracks.items[random];
          let nextName = (nextTrackObj.track.name.split('- ')[1]);
          nextName = nextName ? nextName : nextTrackObj.track.name;
          Session.set('nextTrack', nextName);
          Session.set('nextArtist', nextTrackObj.track.artists[0].name);
        }
      });
      time = 0;
    }
  },1000);
});

Template.nowPlaying.helpers({
  getCurrentTrack() {
    return Session.get('currentTrack') + ' - ' + Session.get('currentArtist');
  }
});

Template.nextTrack.helpers({
  getNextTrack() {
    return Session.get('nextTrack') + ' - ' + Session.get('nextArtist');
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

function getTrackIdsFromAgeGroup(currentAgeGroup, limit) {
  switch (currentAgeGroup) {
    case 'AGE_GROUP_1':
      yearInterval = '2010-2016';
      break;
    case 'AGE_GROUP_2':
      yearInterval = '1995-2005';
      break;
    case 'AGE_GROUP_3':
      yearInterval = '1985-1995';
      break;
    case 'AGE_GROUP_4':
      yearInterval = '1975-1985';
      break;
    case 'AGE_GROUP_5':
      yearInterval = '1965-1975';
      break;
  }
  Meteor.call('GuestUpdates.methods.getTracksFromYear', {yearInterval, limit}, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      let trackIds = [];
      res.body.tracks.items.forEach(function(track) {
        trackIds.push(track.id);
      })
      console.log(trackIds)
      return trackIds;
    }
  })
}

function getCurrentNumberOfGuests() {
  return GuestUpdates.find({value: 'INC'}).count() -
         GuestUpdates.find({value: 'DEC'}).count();
}

function getCurrentAgeGroup() {
  let updates = GuestUpdates.find().fetch();
  let ageArray = new Array(5).fill(0);

  updates.forEach(function(update) {
    switch(update.age) {
      case 'AGE_GROUP_1':
        ageArray[0]++;
        break;
      case 'AGE_GROUP_2':
        ageArray[1]++;
        break;
      case 'AGE_GROUP_3':
        ageArray[2]++;
        break;
      case 'AGE_GROUP_4':
        ageArray[3]++;
        break;
      case 'AGE_GROUP_5':
        ageArray[4]++;
        break;
    }
  })

  let maxAge = _.indexOf(ageArray, _.max(ageArray));
  console.log(maxAge)
  switch(maxAge) {
    case 0:
      Session.set('currentAgeGroup', 'AGE_GROUP_1');
      return 'AGE_GROUP_1';
      break;
    case 1:
      Session.set('currentAgeGroup', 'AGE_GROUP_2');
      return 'AGE_GROUP_2';
      break;
    case 2:
      Session.set('currentAgeGroup', 'AGE_GROUP_3');
      return 'AGE_GROUP_3';
      break;
    case 3:
      Session.set('currentAgeGroup', 'AGE_GROUP_4');
      return 'AGE_GROUP_4';
      break;
    case 4:
      Session.set('currentAgeGroup', 'AGE_GROUP_5');
      return 'AGE_GROUP_5';
      break;
  }

}
