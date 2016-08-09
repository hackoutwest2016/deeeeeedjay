Meteor.publish('GuestUpdates.all', () => {
  return GuestUpdates.find();
});
