var require = meteorInstall({"lib":{"collections":{"guestUpdates":{"collection.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// lib/collections/guestUpdates/collection.js                                                            //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
GuestUpdates = new Mongo.Collection('guestUpdates');                                                     // 1
                                                                                                         //
var guestUpdateSchema = new SimpleSchema({                                                               // 3
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },                                                   // 4
  value: { type: String }, // 'INC', or 'DEC'                                                            // 5
  age: { type: String }, // 'AGE_GROUP_1', 'AGE_GROUP_2', 'AGE_GROUP_3', 'AGE_GROUP_4', or 'AGE_GROUP_5'
  gender: { type: String }, // 'GENDER_MALE' or 'GENDER_FEMALE'                                          // 7
  timestamp: { type: Date }                                                                              // 8
});                                                                                                      // 3
                                                                                                         //
GuestUpdates.attachSchema(guestUpdateSchema);                                                            // 11
                                                                                                         //
GuestUpdates.methods = {};                                                                               // 13
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"_helpers.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// lib/_helpers.js                                                                                       //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
Helpers = {};                                                                                            // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////

},"constants.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// lib/constants.js                                                                                      //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
Constants = {};                                                                                          // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"lib":{"guestUpdates":{"methods.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// server/lib/guestUpdates/methods.js                                                                    //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
                                                                                                         //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"publications.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// server/publications.js                                                                                //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
Meteor.startup(function () {});                                                                          // 1
                                                                                                         //
Meteor.publish('GuestUpdates.all', function () {                                                         // 5
  return GuestUpdates.find();                                                                            // 6
});                                                                                                      // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////

},"router.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// server/router.js                                                                                      //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
JsonRoutes.add('post', '/guestUpdate', function (req, res, next) {                                       // 1
  var _req$body = req.body;                                                                              // 1
  var age = _req$body.age;                                                                               // 1
  var gender = _req$body.gender;                                                                         // 1
  var value = _req$body.value;                                                                           // 1
                                                                                                         //
  var timestamp = new Date(+req.body.timestamp);                                                         // 3
                                                                                                         //
  var options = {                                                                                        // 5
    data: {                                                                                              // 6
      message: 'Success! guestUpdate has been registered'                                                // 7
    },                                                                                                   // 6
    code: 200                                                                                            // 9
  };                                                                                                     // 5
                                                                                                         //
  GuestUpdates.insert({ age: age,                                                                        // 12
    gender: gender,                                                                                      // 14
    value: value,                                                                                        // 15
    timestamp: timestamp                                                                                 // 16
  }, function (err, guestUpdateId) {                                                                     // 13
    if (err) {                                                                                           // 18
      console.log('Error on POST to guestUpdate: ' + err.message);                                       // 19
      options = {                                                                                        // 20
        data: {                                                                                          // 21
          message: err.message                                                                           // 22
        },                                                                                               // 21
        code: 500                                                                                        // 24
      };                                                                                                 // 20
    } else {                                                                                             // 26
      console.log('Success! guestUpdate has been registered');                                           // 27
    }                                                                                                    // 28
  });                                                                                                    // 29
  return JsonRoutes.sendResult(res, options);                                                            // 30
});                                                                                                      // 31
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json"]});
require("./lib/collections/guestUpdates/collection.js");
require("./server/lib/guestUpdates/methods.js");
require("./lib/_helpers.js");
require("./lib/constants.js");
require("./server/publications.js");
require("./server/router.js");
//# sourceMappingURL=app.js.map
