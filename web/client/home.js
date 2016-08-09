Template.home.onCreated(function() {
  this.autorun(() => {
    this.subscribe('GuestUpdates.all');
    
    var options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: ['user-read-email'] // Spotify access scopes.
    };
    Meteor.loginWithSpotify(options, function(err) {
      console.log(err || "No error");
      
      Meteor.call('GuestUpdates.methods.getElvis', {}, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log('hej');
        }
      });
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
