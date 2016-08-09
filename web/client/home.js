Template.home.onCreated(function() {
  this.autorun(() => {
    this.subscribe('GuestUpdates.all');
  });
});

