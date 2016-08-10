const AGE_GROUP_1 = 20;
const AGE_GROUP_2 = 30;
const AGE_GROUP_3 = 40;
const AGE_GROUP_4 = 50;
const AGE_GROUP_5 = 60;

const houseTrigger = 10;
const danceTrigger = 20;


Template.home.onCreated(function() {
  this.autorun(() => {
  
  Session.set('currentNumberOfGuests', getCurrentNumberOfGuests());
  Session.set('getCurrentAgeGroup', getCurrentAgeGroup());
  });

});

Template.home.events({
  'click .logo': function() {
    var options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: ['user-read-email'] // Spotify access scopes.
    };
    Meteor.loginWithSpotify(options, function(err) {
      console.log(err || "No error");
    });
  },
});

Template.home.helpers({
  guestAmount() {
    const currentNumberOfGuests = Session.get('currentNumberOfGuests');
    if (currentNumberOfGuests < houseTrigger) {
      return 'carouselLounge';
    } else if (currentNumberOfGuests < danceTrigger) {
      return 'carouselHouse';
    }
    return 'carouselDance';
  },
  getAgeGroupAmount(ageString) {
    const inc = GuestUpdates.find({ age: ageString, value: 'INC' }).count();
    const dec = GuestUpdates.find({ age: ageString, value: 'DEC' }).count();
    return inc - dec;
  },
});

Template.carousel.onRendered(() => {
  $('#carousel').slick({
    autoplay: false,
    autoplaySpeed: 5000,
    infinite: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
  });
  Meteor.setTimeout(function(){
    $('#carousel').slickPlay();
  },1000);
});

Template.carousel.helpers({
  getSlideOne() {
    let currentNumberOfGuests = Session.get('currentNumberOfGuests');
    let templateName = 'slideOne';
    if(currentNumberOfGuests < houseTrigger) {
      templateName += 'Lounge';
    } else if(currentNumberOfGuests < danceTrigger) {
      templateName += 'House';
    } else {
      templateName += 'Dance';
    }
    return templateName;
  },
  getSlideTwo() {
    let currentNumberOfGuests = Session.get('currentNumberOfGuests');
    let templateName = 'slideTwo';
    if(currentNumberOfGuests < houseTrigger) {
      templateName += 'Lounge';
    } else if(currentNumberOfGuests < danceTrigger) {
      templateName += 'House';
    } else {
      templateName += 'Dance';
    }
    return templateName;
  },
  getSlideThree() {
    let currentNumberOfGuests = Session.get('currentNumberOfGuests');
    let templateName = 'slideThree';
    if(currentNumberOfGuests < houseTrigger) {
      templateName += 'Lounge';
    } else if(currentNumberOfGuests < danceTrigger) {
      templateName += 'House';
    } else {
      templateName += 'Dance';
    }
    return templateName;
  },
  getSlideFour() {
    let currentNumberOfGuests = Session.get('currentNumberOfGuests');
    let templateName = 'slideFour';
    if(currentNumberOfGuests < houseTrigger) {
      templateName += 'Lounge';
    } else if(currentNumberOfGuests < danceTrigger) {
      templateName += 'House';
    } else {
      templateName += 'Dance';
    }
    return templateName;
  },
  getSlideFive() {
    let currentNumberOfGuests = Session.get('currentNumberOfGuests');
    let templateName = 'slideFive';
    if(currentNumberOfGuests < houseTrigger) {
      templateName += 'Lounge';
    } else if(currentNumberOfGuests < danceTrigger) {
      templateName += 'House';
    } else {
      templateName += 'Dance';
    }
    return templateName;
  },
  getcurrentAmountOfGuests() {
    return Session.get('currentNumberOfGuests');
  }
});

Template.slideOneLounge.inheritsHelpersFrom('carousel');
Template.slideOneHouse.inheritsHelpersFrom('carousel');
Template.slideOneDance.inheritsHelpersFrom('carousel');

Template.slideTwoLounge.inheritsHelpersFrom('carousel');
Template.slideTwoHouse.inheritsHelpersFrom('carousel');
Template.slideTwoDance.inheritsHelpersFrom('carousel');

Template.slideThreeLounge.inheritsHelpersFrom('carousel');
Template.slideThreeHouse.inheritsHelpersFrom('carousel');
Template.slideThreeDance.inheritsHelpersFrom('carousel');

Template.slideFourLounge.inheritsHelpersFrom('carousel');
Template.slideFourHouse.inheritsHelpersFrom('carousel');
Template.slideFourDance.inheritsHelpersFrom('carousel');

Template.slideFiveLounge.inheritsHelpersFrom('carousel');
Template.slideFiveHouse.inheritsHelpersFrom('carousel');
Template.slideFiveDance.inheritsHelpersFrom('carousel');

// Template.carouselLounge.helpers({
//   ageGroup() {
//     let templateName;
//
//     console.log('Lounge: ' + Session.get('currentAgeGroup'));
//     switch(Session.get('currentAgeGroup')) {
//       case 'AGE_GROUP_1':
//         templateName = 'loungeOne';
//         break;
//       case 'AGE_GROUP_2':
//         templateName = 'loungeTwo';
//         break;
//       case 'AGE_GROUP_3':
//         templateName = 'loungeThree';
//         break;
//       case 'AGE_GROUP_4':
//         templateName = 'loungeFour';
//         break;
//       case 'AGE_GROUP_5':
//         templateName = 'loungeFive';
//         break;
//     }
//     return templateName;
//   },
// });
//
// Template.carouselHouse.helpers({
//   ageGroup() {
//     let templateName;
//
//     console.log('House: ' + Session.get('currentAgeGroup'));
//     switch(Session.get('currentAgeGroup')) {
//       case 'AGE_GROUP_1':
//         templateName = 'houseOne';
//         break;
//       case 'AGE_GROUP_2':
//         templateName = 'houseTwo';
//         break;
//       case 'AGE_GROUP_3':
//         templateName = 'houseThree';
//         break;
//       case 'AGE_GROUP_4':
//         templateName = 'houseFour';
//         break;
//       case 'AGE_GROUP_5':
//         templateName = 'houseFive';
//         break;
//     }
//     return templateName;
//   },
// });
//
// Template.carouselDance.helpers({
//   ageGroup() {
//     let templateName;
//
//     console.log('Dance: ' + Session.get('currentAgeGroup'));
//     switch(Session.get('currentAgeGroup')) {
//       case 'AGE_GROUP_1':
//         templateName = 'danceOne';
//         break;
//       case 'AGE_GROUP_2':
//         templateName = 'danceTwo';
//         break;
//       case 'AGE_GROUP_3':
//         templateName = 'danceThree';
//         break;
//       case 'AGE_GROUP_4':
//         templateName = 'danceFour';
//         break;
//       case 'AGE_GROUP_5':
//         templateName = 'danceFive';
//         break;
//     }
//     return templateName;
//   },
// });
//
// Template.loungeOne.inheritsHelpersFrom('home');
// Template.loungeTwo.inheritsHelpersFrom('home');
// Template.loungeThree.inheritsHelpersFrom('home');
// Template.loungeFour.inheritsHelpersFrom('home');
// Template.loungeFive.inheritsHelpersFrom('home');
// Template.houseOne.inheritsHelpersFrom('home');
// Template.houseTwo.inheritsHelpersFrom('home');
// Template.houseThree.inheritsHelpersFrom('home');
// Template.houseFour.inheritsHelpersFrom('home');
// Template.houseFive.inheritsHelpersFrom('home');
// Template.danceOne.inheritsHelpersFrom('home');
// Template.danceTwo.inheritsHelpersFrom('home');
// Template.danceThree.inheritsHelpersFrom('home');
// Template.danceFour.inheritsHelpersFrom('home');
// Template.danceFive.inheritsHelpersFrom('home');

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

var lastAgeGroup = "none";

Template.nowPlaying.onCreated(function() {

  this.autorun(() => {

    let currentAgeGroup = getCurrentAgeGroup();

    if (currentAgeGroup !== lastAgeGroup) {
      lastAgeGroup = currentAgeGroup;
      console.log("New age group: " + currentAgeGroup);

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
      Meteor.call('GuestUpdates.methods.getTracksFromYear', { yearInterval: yearInterval, limit: 10 }, (err, res) => {
        if (err) {
          console.log(err)
        } else {
          let tracks = [];
          res.body.tracks.items.forEach(function(track) {
            tracks.push(track);
          })
          Session.set('tracks', tracks);
        }
      });
    }
  });

  let trackNr = 0;
  let time = -1;
  Meteor.setInterval(function(){
    time++;
    if (time === 0) {
      if(Session.get('tracks')) {
        let tracks = Session.get('tracks');

        if(Session.get('nextTrack')) {
          Session.set('currentTrack', Session.get('nextTrack'));
        } else {
          Session.set('currentTrack', tracks[0]);
        }

        let track = Session.get('currentTrack');
        $('#player').attr('src', track.preview_url);
        let name = (track.name.split('- ')[1]);
        name = name ? name : track.name;
        Session.set('currentTrackName', name);
        Session.set('currentArtist', track.artists[0].name);

        trackNr = incrementTrackNumber(trackNr, tracks);
        let nextTrack = tracks[trackNr];
        Session.set('nextTrack', nextTrack);
        let nextName = (nextTrack.name.split('- ')[1]);
        nextName = nextName ? nextName : nextTrack.name;
        Session.set('nextTrackName', nextName);
        Session.set('nextArtist', nextTrack.artists[0].name);
      }
    }
    else if (time === 4) {
        time = -1;
    }
  },1000);
});

Template.nowPlaying.helpers({
  getCurrentTrack() {
    return Session.get('currentTrackName') + ' - ' + Session.get('currentArtist');
  }
});

Template.nextTrack.helpers({
  getNextTrack() {
    return Session.get('nextTrackName') + ' - ' + Session.get('nextArtist');
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

function getTracksFromAgeGroup(currentAgeGroup, limit) {
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
      let tracks = [];
      res.body.tracks.items.forEach(function(track) {
        tracks.push(track);
      })
      return tracks;
    }
  })
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

function getCurrentNumberOfGuests() {
  let inc = GuestUpdates.find({value: 'INC'}).count();
  let dec = GuestUpdates.find({value: 'DEC'}).count();
  return (inc - dec);
}

function incrementTrackNumber(trackNr, tracks) {
  trackNr++;
  if (trackNr >= tracks.length) {
    trackNr = 0;
  }
  return trackNr;
}
