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
      /*
      Meteor.call('GuestUpdates.methods.getElvis', {}, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log('hej');
        }
      });
      */
      let yearInterval;
      let currentAgeGroup = getCurrentAgeGroup();

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
      let trackIds = getTrackIdsFromYear(yearInterval, 10)
      console.log(trackIds)
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

function getTrackIdsFromYear(year, limit) {
  Meteor.call('GuestUpdates.methods.getTracksFromYear', {year, limit}, (err, res) => {
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

  let maxAge = _.max(ageArray);
  switch(maxAge) {
    case 0:
      return 'AGE_GROUP_1';
      break;
    case 1:
      return 'AGE_GROUP_2';
      break;
    case 2:
      return 'AGE_GROUP_3';
      break;
    case 3:
      return 'AGE_GROUP_4';
      break;
    case 4:
      return 'AGE_GROUP_5';
      break;
  }

}
