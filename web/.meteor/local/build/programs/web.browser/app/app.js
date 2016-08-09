var require = meteorInstall({"client":{"template.body.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// client/template.body.js                                                                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
                                                                                                                 // 1
Template.body.addContent((function() {                                                                           // 2
  var view = this;                                                                                               // 3
  return "";                                                                                                     // 4
}));                                                                                                             // 5
Meteor.startup(Template.body.renderToDocument);                                                                  // 6
                                                                                                                 // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.home.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// client/template.home.js                                                                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
                                                                                                                 // 1
Template.__checkName("home");                                                                                    // 2
Template["home"] = new Template("Template.home", (function() {                                                   // 3
  var view = this;                                                                                               // 4
  return HTML.DIV({                                                                                              // 5
    "class": "page"                                                                                              // 6
  }, HTML.Raw('\n\n		<!-- <div id="now-playing">\n			Now Playing: Håkan Hellström - Din tid kommer\n		</div> -->\n		'), Spacebars.include(view.lookupTemplate("nowPlaying")), HTML.Raw("\n\n		<!-- <h1>DeeeeeDjay</h1> -->\n		<!-- {{> currentGuests }} -->\n		<!-- {{> genderRatio}} -->\n		<!-- {{> ageRatio}} -->\n		"), Spacebars.include(view.lookupTemplate("nextTrack")), "\n\n  ");
}));                                                                                                             // 8
                                                                                                                 // 9
Template.__checkName("nowPlaying");                                                                              // 10
Template["nowPlaying"] = new Template("Template.nowPlaying", (function() {                                       // 11
  var view = this;                                                                                               // 12
  return HTML.Raw('<div id="now-playing">\n		<span class="left-col">Now Playing:</span>\n		<span class="mid-col">Håkan Hellström - Din tid kommer</span>\n		<span class="right-col">&nbsp;</span>\n	</div>');
}));                                                                                                             // 14
                                                                                                                 // 15
Template.__checkName("nextTrack");                                                                               // 16
Template["nextTrack"] = new Template("Template.nextTrack", (function() {                                         // 17
  var view = this;                                                                                               // 18
  return HTML.Raw('<div id="next-track">\n		<span class="left-col">Next Song:</span>\n		<span class="mid-col">Zara Larsson - Lush Life</span>\n		<span class="right-col count-down">00:07</span>\n  </div>');
}));                                                                                                             // 20
                                                                                                                 // 21
Template.__checkName("carousel");                                                                                // 22
Template["carousel"] = new Template("Template.carousel", (function() {                                           // 23
  var view = this;                                                                                               // 24
  return HTML.DIV({                                                                                              // 25
    id: "carousel"                                                                                               // 26
  }, "\n		", Spacebars.include(view.lookupTemplate("currentGuests")), "\n		", Spacebars.include(view.lookupTemplate("genderRatio")), "\n	");
}));                                                                                                             // 28
                                                                                                                 // 29
Template.__checkName("currentGuests");                                                                           // 30
Template["currentGuests"] = new Template("Template.currentGuests", (function() {                                 // 31
  var view = this;                                                                                               // 32
  return HTML.DIV({                                                                                              // 33
    "class": "current-guests-container"                                                                          // 34
  }, "\n		", HTML.DIV({                                                                                          // 35
    "class": "slider-text-container"                                                                             // 36
  }, "\n			", HTML.H2("Come on, there's ", Blaze.View("lookup:getNumberOfGuests", function() {                   // 37
    return Spacebars.mustache(view.lookup("getNumberOfGuests"));                                                 // 38
  }), " people in here,"), "\n			", HTML.Raw("<h1>Get on the dancefloor!</h1>"), "\n		"), "\n	");                // 39
}));                                                                                                             // 40
                                                                                                                 // 41
Template.__checkName("genderRatio");                                                                             // 42
Template["genderRatio"] = new Template("Template.genderRatio", (function() {                                     // 43
  var view = this;                                                                                               // 44
  return HTML.DIV({                                                                                              // 45
    "class": "gender-ratio-container"                                                                            // 46
  }, "\n		", HTML.DIV({                                                                                          // 47
    "class": "slider-text-container"                                                                             // 48
  }, "\n			", HTML.H2("Right now, there's ", Blaze.View("lookup:getNumberOfWomen", function() {                  // 49
    return Spacebars.mustache(view.lookup("getNumberOfWomen"));                                                  // 50
  }), " women and ", Blaze.View("lookup:getNumberOfMen", function() {                                            // 51
    return Spacebars.mustache(view.lookup("getNumberOfMen"));                                                    // 52
  }), " men up in here!"), "\n		"), "\n	");                                                                      // 53
}));                                                                                                             // 54
                                                                                                                 // 55
Template.__checkName("ageRatio");                                                                                // 56
Template["ageRatio"] = new Template("Template.ageRatio", (function() {                                           // 57
  var view = this;                                                                                               // 58
  return HTML.DIV({                                                                                              // 59
    "class": "age-ratio-container"                                                                               // 60
  }, "\n		", HTML.DIV({                                                                                          // 61
    "class": "twenties-age-container"                                                                            // 62
  }, "\n			", HTML.Raw("<h2>Twenties</h2>"), "\n			", Blaze.View("lookup:getNumberOfTwenties", function() {      // 63
    return Spacebars.mustache(view.lookup("getNumberOfTwenties"));                                               // 64
  }), "\n		"), "\n		", HTML.DIV({                                                                                // 65
    "class": "thirties-age-container"                                                                            // 66
  }, "\n			", HTML.Raw("<h2>Thirties</h2>"), "\n			", Blaze.View("lookup:getNumberOfThirties", function() {      // 67
    return Spacebars.mustache(view.lookup("getNumberOfThirties"));                                               // 68
  }), "\n		"), HTML.Raw('\n		<!-- <div class="fourties-age-container">\n			<h2>Twenties</h2>\n			{{ getNumberOfFourties }}\n		</div>\n		<div class="fifties-age-container">\n			<h2>Twenties</h2>\n			{{ getNumberOfFifties }}\n		</div>\n		<div class="Sixties-age-container">\n			<h2>Twenties</h2>\n			{{ getNumberOfSixties }}\n		</div> -->\n	'));
}));                                                                                                             // 70
                                                                                                                 // 71
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"guestUpdates":{"guestUpdates.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// client/guestUpdates/guestUpdates.js                                                                           //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
                                                                                                                 //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"home.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// client/home.js                                                                                                //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
Template.home.onCreated(function () {                                                                            // 1
  var _this = this;                                                                                              // 1
                                                                                                                 //
  this.autorun(function () {                                                                                     // 2
    _this.subscribe('GuestUpdates.all');                                                                         // 3
                                                                                                                 //
    var options = {                                                                                              // 5
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: ['user-read-email'] // Spotify access scopes.                                          // 7
    };                                                                                                           // 5
    Meteor.loginWithSpotify(options, function (err) {                                                            // 9
      console.log(err || "No error");                                                                            // 10
                                                                                                                 //
      Meteor.call('GuestUpdates.methods.getElvis', {}, function (err, res) {                                     // 12
        if (err) {                                                                                               // 13
          console.log(err);                                                                                      // 14
        } else {                                                                                                 // 15
          console.log('hej');                                                                                    // 16
        }                                                                                                        // 17
      });                                                                                                        // 18
    });                                                                                                          // 19
  });                                                                                                            // 20
});                                                                                                              // 21
                                                                                                                 //
Template.carousel.onRendered(function () {                                                                       // 23
  $('#carousel').slick({                                                                                         // 24
    autoplay: true,                                                                                              // 25
    autoplaySpeed: 2000,                                                                                         // 26
    infinite: true                                                                                               // 27
  });                                                                                                            // 24
});                                                                                                              // 29
                                                                                                                 //
Template.currentGuests.helpers({                                                                                 // 31
  getNumberOfGuests: function () {                                                                               // 32
    function getNumberOfGuests() {                                                                               // 31
      return getFieldAmount(GuestUpdates.find().fetch(), function () {                                           // 33
        return true;                                                                                             // 34
      });                                                                                                        // 35
    }                                                                                                            // 36
                                                                                                                 //
    return getNumberOfGuests;                                                                                    // 31
  }()                                                                                                            // 31
});                                                                                                              // 31
                                                                                                                 //
Template.genderRatio.helpers({                                                                                   // 39
  getNumberOfWomen: function () {                                                                                // 40
    function getNumberOfWomen() {                                                                                // 39
      return getFieldAmount(GuestUpdates.find().fetch(), function (guestUpdate) {                                // 41
        return guestUpdate.gender === 'GENDER_FEMALE';                                                           // 42
      });                                                                                                        // 43
    }                                                                                                            // 44
                                                                                                                 //
    return getNumberOfWomen;                                                                                     // 39
  }(),                                                                                                           // 39
  getNumberOfMen: function () {                                                                                  // 45
    function getNumberOfMen() {                                                                                  // 39
      return getFieldAmount(GuestUpdates.find().fetch(), function (guestUpdate) {                                // 46
        return guestUpdate.gender === 'GENDER_MALE';                                                             // 47
      });                                                                                                        // 48
    }                                                                                                            // 49
                                                                                                                 //
    return getNumberOfMen;                                                                                       // 39
  }()                                                                                                            // 39
});                                                                                                              // 39
                                                                                                                 //
Template.ageRatio.helpers({                                                                                      // 52
  getNumberOfTwenties: function () {                                                                             // 53
    function getNumberOfTwenties() {                                                                             // 52
      var guestUpdates = GuestUpdates.find({ age: 'AGE_GROUP_1' }).fetch();                                      // 54
      var value = 0;                                                                                             // 55
      _.each(guestUpdates, function (guestUpdate) {                                                              // 56
        if (guestUpdate.value === 'INC') {                                                                       // 57
          value++;                                                                                               // 58
        } else if (guestUpdate.value === 'DEC') {                                                                // 59
          value--;                                                                                               // 60
        }                                                                                                        // 61
      });                                                                                                        // 62
      return value;                                                                                              // 63
    }                                                                                                            // 64
                                                                                                                 //
    return getNumberOfTwenties;                                                                                  // 52
  }(),                                                                                                           // 52
  getNumberOfThirties: function () {                                                                             // 65
    function getNumberOfThirties() {                                                                             // 52
      var guestUpdates = GuestUpdates.find({ age: 'AGE_GROUP_2' }).fetch();                                      // 66
      var value = 0;                                                                                             // 67
      _.each(guestUpdates, function (guestUpdate) {                                                              // 68
        if (guestUpdate.value === 'INC') {                                                                       // 69
          value++;                                                                                               // 70
        } else if (guestUpdate.value === 'DEC') {                                                                // 71
          value--;                                                                                               // 72
        }                                                                                                        // 73
      });                                                                                                        // 74
      return value;                                                                                              // 75
    }                                                                                                            // 76
                                                                                                                 //
    return getNumberOfThirties;                                                                                  // 52
  }()                                                                                                            // 52
});                                                                                                              // 52
                                                                                                                 //
function getFieldAmount(array, fun) {                                                                            // 80
  var currentAmount = 0;                                                                                         // 81
  _.each(array, function (item) {                                                                                // 82
    var amount = item.value === 'INC' ? 1 : -1;                                                                  // 83
    currentAmount += fun(item) ? amount : 0;                                                                     // 84
  });                                                                                                            // 85
                                                                                                                 //
  return currentAmount;                                                                                          // 87
}                                                                                                                // 88
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"router.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// client/router.js                                                                                              //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
FlowRouter.route('/', {                                                                                          // 1
  action: function () {                                                                                          // 2
    function action() {                                                                                          // 1
      BlazeLayout.render('home', {});                                                                            // 3
    }                                                                                                            // 4
                                                                                                                 //
    return action;                                                                                               // 1
  }()                                                                                                            // 1
});                                                                                                              // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lib":{"collections":{"guestUpdates":{"collection.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// lib/collections/guestUpdates/collection.js                                                                    //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
GuestUpdates = new Mongo.Collection('guestUpdates');                                                             // 1
                                                                                                                 //
var guestUpdateSchema = new SimpleSchema({                                                                       // 3
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },                                                           // 4
  value: { type: String }, // 'INC', or 'DEC'                                                                    // 5
  age: { type: String }, // 'AGE_GROUP_1', 'AGE_GROUP_2', 'AGE_GROUP_3', 'AGE_GROUP_4', or 'AGE_GROUP_5'         // 6
  gender: { type: String }, // 'GENDER_MALE' or 'GENDER_FEMALE'                                                  // 7
  timestamp: { type: Date }                                                                                      // 8
});                                                                                                              // 3
                                                                                                                 //
GuestUpdates.attachSchema(guestUpdateSchema);                                                                    // 11
                                                                                                                 //
GuestUpdates.methods = {};                                                                                       // 13
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"_helpers.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// lib/_helpers.js                                                                                               //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
Helpers = {};                                                                                                    // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"constants.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// lib/constants.js                                                                                              //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
Constants = {                                                                                                    // 1
  clientId: '403ae8720ffb4073b04f4a9984181dab',                                                                  // 2
  secret: '4dc1f953232a43d6a30b4a9b407c33a3'                                                                     // 3
};                                                                                                               // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json",".html",".css",".scss"]});
require("./client/template.body.js");
require("./client/template.home.js");
require("./lib/collections/guestUpdates/collection.js");
require("./lib/_helpers.js");
require("./lib/constants.js");
require("./client/guestUpdates/guestUpdates.js");
require("./client/home.js");
require("./client/router.js");