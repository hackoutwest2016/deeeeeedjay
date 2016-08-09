var require = meteorInstall({"imports":{"api":{"tasks.js":["meteor/mongo",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/tasks.js                                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({Tasks:function(){return Tasks}});var Mongo;module.import('meteor/mongo',{"Mongo":function(v){Mongo=v}});
                                                                                                                     //
var Tasks = new Mongo.Collection('tasks');                                                                           // 3
                                                                                                                     //
if (Meteor.isServer) {                                                                                               // 5
  // This code only runs on the server                                                                               //
                                                                                                                     //
  // e.g.:                                                                                                           //
  // Meteor.publish('tasks', function tasksPublication() {                                                           //
  //  return Tasks.find();                                                                                           //
  // });                                                                                                             //
}                                                                                                                    // 12
                                                                                                                     //
Meteor.methods({                                                                                                     // 14
  // e.g.:                                                                                                           //
                                                                                                                     //
  // 'tasks.insert' (text) {                                                                                         //
  //                                                                                                                 //
  // },                                                                                                              //
                                                                                                                     //
  // 'tasks.remove' (taskId) {                                                                                       //
  //                                                                                                                 //
  // }                                                                                                               //
});                                                                                                                  // 14
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"server":{"main.js":["meteor/meteor","../imports/api/tasks.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/main.js                                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});module.import('../imports/api/tasks.js');
                                                                                                                     // 2
                                                                                                                     //
Meteor.startup(function () {                                                                                         // 4
  // code to run on server at startup                                                                                //
});                                                                                                                  // 6
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json",".html"]});
require("./server/main.js");
//# sourceMappingURL=app.js.map
