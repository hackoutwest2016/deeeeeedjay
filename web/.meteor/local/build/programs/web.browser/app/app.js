var require = meteorInstall({"client":{"template.body.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// client/template.body.js                                                                                  //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
                                                                                                            // 1
Template.body.addContent((function() {                                                                      // 2
  var view = this;                                                                                          // 3
  return "";                                                                                                // 4
}));                                                                                                        // 5
Meteor.startup(Template.body.renderToDocument);                                                             // 6
                                                                                                            // 7
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.home.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// client/template.home.js                                                                                  //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
                                                                                                            // 1
Template.__checkName("home");                                                                               // 2
Template["home"] = new Template("Template.home", (function() {                                              // 3
  var view = this;                                                                                          // 4
  return HTML.DIV({                                                                                         // 5
    "class": "page"                                                                                         // 6
  }, HTML.Raw("\n		<h1>DeeeeeDjay</h1>\n		\n		"), Spacebars.include(view.lookupTemplate("currentGuests")), "\n		", Spacebars.include(view.lookupTemplate("genderRatio")), "\n		", Spacebars.include(view.lookupTemplate("ageRatio")), "\n\n  ");
}));                                                                                                        // 8
                                                                                                            // 9
Template.__checkName("currentGuests");                                                                      // 10
Template["currentGuests"] = new Template("Template.currentGuests", (function() {                            // 11
  var view = this;                                                                                          // 12
  return HTML.DIV({                                                                                         // 13
    "class": "current-guests-container"                                                                     // 14
  }, HTML.Raw("\n		<h2>Total</h2>\n		"), Blaze.View("lookup:getNumberOfGuests", function() {                // 15
    return Spacebars.mustache(view.lookup("getNumberOfGuests"));                                            // 16
  }), "\n	");                                                                                               // 17
}));                                                                                                        // 18
                                                                                                            // 19
Template.__checkName("genderRatio");                                                                        // 20
Template["genderRatio"] = new Template("Template.genderRatio", (function() {                                // 21
  var view = this;                                                                                          // 22
  return HTML.DIV({                                                                                         // 23
    "class": "gender-ratio-container"                                                                       // 24
  }, "\n		", HTML.DIV({                                                                                     // 25
    "class": "number-of-women-container"                                                                    // 26
  }, "\n			", HTML.Raw("<h2>Women</h2>"), "\n			", Blaze.View("lookup:getNumberOfWomen", function() {       // 27
    return Spacebars.mustache(view.lookup("getNumberOfWomen"));                                             // 28
  }), "\n		"), "\n		", HTML.DIV({                                                                           // 29
    "class": "number-of-men-container"                                                                      // 30
  }, "\n			", HTML.Raw("<h2>Men</h2>"), "\n			", Blaze.View("lookup:getNumberOfMen", function() {           // 31
    return Spacebars.mustache(view.lookup("getNumberOfMen"));                                               // 32
  }), "\n		"), "\n	");                                                                                      // 33
}));                                                                                                        // 34
                                                                                                            // 35
Template.__checkName("ageRatio");                                                                           // 36
Template["ageRatio"] = new Template("Template.ageRatio", (function() {                                      // 37
  var view = this;                                                                                          // 38
  return HTML.DIV({                                                                                         // 39
    "class": "age-ratio-container"                                                                          // 40
  }, "\n		", HTML.DIV({                                                                                     // 41
    "class": "twenties-age-container"                                                                       // 42
  }, "\n			", HTML.Raw("<h2>Twenties</h2>"), "\n			", Blaze.View("lookup:getNumberOfTwenties", function() {
    return Spacebars.mustache(view.lookup("getNumberOfTwenties"));                                          // 44
  }), "\n		"), "\n		", HTML.DIV({                                                                           // 45
    "class": "thirties-age-container"                                                                       // 46
  }, "\n			", HTML.Raw("<h2>Thirties</h2>"), "\n			", Blaze.View("lookup:getNumberOfThirties", function() {
    return Spacebars.mustache(view.lookup("getNumberOfThirties"));                                          // 48
  }), "\n		"), HTML.Raw('\n		<!-- <div class="fourties-age-container">\n			<h2>Twenties</h2>\n			{{ getNumberOfFourties }}\n		</div>\n		<div class="fifties-age-container">\n			<h2>Twenties</h2>\n			{{ getNumberOfFifties }}\n		</div>\n		<div class="Sixties-age-container">\n			<h2>Twenties</h2>\n			{{ getNumberOfSixties }}\n		</div> -->\n	'));
}));                                                                                                        // 50
                                                                                                            // 51
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"guestUpdates":{"guestUpdates.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// client/guestUpdates/guestUpdates.js                                                                      //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
                                                                                                            //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"home.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// client/home.js                                                                                           //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
Template.home.onCreated(function () {                                                                       // 1
  var _this = this;                                                                                         // 1
                                                                                                            //
  this.autorun(function () {                                                                                // 2
    _this.subscribe('GuestUpdates.all');                                                                    // 3
  });                                                                                                       // 4
});                                                                                                         // 5
                                                                                                            //
Template.currentGuests.helpers({                                                                            // 7
  getNumberOfGuests: function () {                                                                          // 8
    function getNumberOfGuests() {                                                                          // 7
      return getFieldAmount(GuestUpdates.find().fetch(), function () {                                      // 9
        return true;                                                                                        // 10
      });                                                                                                   // 11
    }                                                                                                       // 12
                                                                                                            //
    return getNumberOfGuests;                                                                               // 7
  }()                                                                                                       // 7
});                                                                                                         // 7
                                                                                                            //
Template.genderRatio.helpers({                                                                              // 15
  getNumberOfWomen: function () {                                                                           // 16
    function getNumberOfWomen() {                                                                           // 15
      return getFieldAmount(GuestUpdates.find().fetch(), function (guestUpdate) {                           // 17
        return guestUpdate.gender === 'GENDER_FEMALE';                                                      // 18
      });                                                                                                   // 19
    }                                                                                                       // 20
                                                                                                            //
    return getNumberOfWomen;                                                                                // 15
  }(),                                                                                                      // 15
  getNumberOfMen: function () {                                                                             // 21
    function getNumberOfMen() {                                                                             // 15
      return getFieldAmount(GuestUpdates.find().fetch(), function (guestUpdate) {                           // 22
        return guestUpdate.gender === 'GENDER_MALE';                                                        // 23
      });                                                                                                   // 24
    }                                                                                                       // 25
                                                                                                            //
    return getNumberOfMen;                                                                                  // 15
  }()                                                                                                       // 15
});                                                                                                         // 15
                                                                                                            //
Template.ageRatio.helpers({                                                                                 // 28
  getNumberOfTwenties: function () {                                                                        // 29
    function getNumberOfTwenties() {                                                                        // 28
      var guestUpdates = GuestUpdates.find({ age: 'AGE_GROUP_1' }).fetch();                                 // 30
      var value = 0;                                                                                        // 31
      _.each(guestUpdates, function (guestUpdate) {                                                         // 32
        if (guestUpdate.value === 'INC') {                                                                  // 33
          value++;                                                                                          // 34
        } else if (guestUpdate.value === 'DEC') {                                                           // 35
          value--;                                                                                          // 36
        }                                                                                                   // 37
      });                                                                                                   // 38
      return value;                                                                                         // 39
    }                                                                                                       // 40
                                                                                                            //
    return getNumberOfTwenties;                                                                             // 28
  }(),                                                                                                      // 28
  getNumberOfThirties: function () {                                                                        // 41
    function getNumberOfThirties() {                                                                        // 28
      var guestUpdates = GuestUpdates.find({ age: 'AGE_GROUP_2' }).fetch();                                 // 42
      var value = 0;                                                                                        // 43
      _.each(guestUpdates, function (guestUpdate) {                                                         // 44
        if (guestUpdate.value === 'INC') {                                                                  // 45
          value++;                                                                                          // 46
        } else if (guestUpdate.value === 'DEC') {                                                           // 47
          value--;                                                                                          // 48
        }                                                                                                   // 49
      });                                                                                                   // 50
      return value;                                                                                         // 51
    }                                                                                                       // 52
                                                                                                            //
    return getNumberOfThirties;                                                                             // 28
  }()                                                                                                       // 28
});                                                                                                         // 28
                                                                                                            //
function getFieldAmount(array, fun) {                                                                       // 56
  var currentAmount = 0;                                                                                    // 57
  _.each(array, function (item) {                                                                           // 58
    var amount = item.value === 'INC' ? 1 : -1;                                                             // 59
    currentAmount += fun(item) ? amount : 0;                                                                // 60
  });                                                                                                       // 61
                                                                                                            //
  return currentAmount;                                                                                     // 63
}                                                                                                           // 64
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"router.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// client/router.js                                                                                         //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
FlowRouter.route('/', {                                                                                     // 1
  action: function () {                                                                                     // 2
    function action() {                                                                                     // 1
      BlazeLayout.render('home', {});                                                                       // 3
    }                                                                                                       // 4
                                                                                                            //
    return action;                                                                                          // 1
  }()                                                                                                       // 1
});                                                                                                         // 1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lib":{"collections":{"guestUpdates":{"collection.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// lib/collections/guestUpdates/collection.js                                                               //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
GuestUpdates = new Mongo.Collection('guestUpdates');                                                        // 1
                                                                                                            //
var guestUpdateSchema = new SimpleSchema({                                                                  // 3
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },                                                      // 4
  value: { type: String }, // 'INC', or 'DEC'                                                               // 5
  age: { type: String }, // 'AGE_GROUP_1', 'AGE_GROUP_2', 'AGE_GROUP_3', 'AGE_GROUP_4', or 'AGE_GROUP_5'    // 6
  gender: { type: String }, // 'GENDER_MALE' or 'GENDER_FEMALE'                                             // 7
  timestamp: { type: Date }                                                                                 // 8
});                                                                                                         // 3
                                                                                                            //
GuestUpdates.attachSchema(guestUpdateSchema);                                                               // 11
                                                                                                            //
GuestUpdates.methods = {};                                                                                  // 13
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"_helpers.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// lib/_helpers.js                                                                                          //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
Helpers = {};                                                                                               // 1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"constants.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// lib/constants.js                                                                                         //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
Constants = {};                                                                                             // 1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json",".html"]});
require("./client/template.body.js");
require("./client/template.home.js");
require("./lib/collections/guestUpdates/collection.js");
require("./lib/_helpers.js");
require("./lib/constants.js");
require("./client/guestUpdates/guestUpdates.js");
require("./client/home.js");
require("./client/router.js");