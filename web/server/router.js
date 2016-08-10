JsonRoutes.add('post', '/guestUpdate', (req, res, next) => {
  console.log("asdf")
  const { age, gender, value } = req.body;
  const timestamp = new Date(+req.body.timestamp);


  let options = {
    data: {
      message: 'Success! guestUpdate has been registered',
    },
    code: 200,
  };

  GuestUpdates.insert(
    { age,
      gender,
      value,
      timestamp,
    }, (err, guestUpdateId) => {
      if (err) {
        console.log(`Error on POST to guestUpdate: ${err.message}`);
        options = {
          data: {
            message: err.message,
          },
          code: 500,
        };
      } else {
        console.log('Success! guestUpdate has been registered');
      }
  });
  return JsonRoutes.sendResult(res, options);
});
