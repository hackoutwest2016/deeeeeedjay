Meteor.startup(() => {
  ServiceConfiguration.configurations.update(
    { service: 'spotify' },
    { $set:
      { clientId: Constants.clientId,
        secret: Constants.secret,
      },
    },
    { upsert: true }
  );
});
