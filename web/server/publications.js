Meteor.startup(() => {
  ServiceConfiguration.configurations.update(
  { "service": "spotify" },
  {
    $set: {
      "clientId": "403ae8720ffb4073b04f4a9984181dab",
      "secret": "4dc1f953232a43d6a30b4a9b407c33a3"
    }
  },
  { upsert: true }
);
});

Meteor.publish('GuestUpdates.all', () => {
  return GuestUpdates.find();
});
