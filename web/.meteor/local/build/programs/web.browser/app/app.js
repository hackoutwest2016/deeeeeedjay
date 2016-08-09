var require = meteorInstall({"imports":{"components":{"todosList":{"todosList.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// imports/components/todosList/todosList.html                                                                 //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
                                                                                                               // 1
      if (Meteor.isServer) return;                                                                             // 2
                                                                                                               // 3
      var templateUrl = "/imports/components/todosList/todosList.html";                                        // 4
      var template = "<header> <h1>Todo List ( {{$ctrl.incompleteCount}} )</h1> <label class=\"hide-completed\"> <input type=\"checkbox\" ng-model=\"$ctrl.hideCompleted\"> Hide Completed Tasks </label> <form class=\"new-task\" ng-submit=\"$ctrl.addTask($ctrl.newTask)\"> <input ng-model=\"$ctrl.newTask\" type=\"text\" name=\"text\" placeholder=\"Type to add new tasks\"> </form> </header> <ul> <li ng-repeat=\"task in $ctrl.tasks\" ng-class=\"{'checked': task.checked}\"> <button class=\"delete\" ng-click=\"$ctrl.removeTask(task)\">&times;</button> <input type=\"checkbox\" ng-checked=\"task.checked\" ng-click=\"$ctrl.setChecked(task)\" class=\"toggle-checked\"> <span class=\"text\"> {{task.text}} </span> </li></ul> ";
                                                                                                               // 6
      angular.module('angular-templates')                                                                      // 7
        .run(['$templateCache', function($templateCache) {                                                     // 8
          $templateCache.put(templateUrl, template);                                                           // 9
        }]);                                                                                                   // 10
                                                                                                               // 11
      module.exports = {};                                                                                     // 12
      module.exports.__esModule = true;                                                                        // 13
      module.exports.default = templateUrl;                                                                    // 14
                                                                                                               // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"todosList.js":["babel-runtime/helpers/classCallCheck","angular","angular-meteor","../../api/tasks.js","./todosList.html",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// imports/components/todosList/todosList.js                                                                   //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _classCallCheck;module.import('babel-runtime/helpers/classCallCheck',{"default":function(v){_classCallCheck=v}});var angular;module.import('angular',{"default":function(v){angular=v}});var angularMeteor;module.import('angular-meteor',{"default":function(v){angularMeteor=v}});var Tasks;module.import('../../api/tasks.js',{"Tasks":function(v){Tasks=v}});var template;module.import('./todosList.html',{"default":function(v){template=v}});
                                                                                                               // 1
                                                                                                               // 2
                                                                                                               // 3
                                                                                                               //
                                                                                                               // 5
                                                                                                               //
var TodosListCtrl = function () {                                                                              //
  function TodosListCtrl($scope) {                                                                             // 8
    _classCallCheck(this, TodosListCtrl);                                                                      // 8
                                                                                                               //
    $scope.viewModel(this);                                                                                    // 9
                                                                                                               //
    this.hideCompleted = false;                                                                                // 11
                                                                                                               //
    this.helpers({                                                                                             // 13
      tasks: function () {                                                                                     // 14
        function tasks() {                                                                                     // 13
          var selector = {};                                                                                   // 15
                                                                                                               //
          // If hide completed is checked, filter tasks                                                        //
          if (this.getReactively('hideCompleted')) {                                                           // 18
            selector.checked = {                                                                               // 19
              $ne: true                                                                                        // 20
            };                                                                                                 // 19
          }                                                                                                    // 22
                                                                                                               //
          // Show newest tasks at the top                                                                      //
          return Tasks.find(selector, {                                                                        // 25
            sort: {                                                                                            // 26
              createdAt: -1                                                                                    // 27
            }                                                                                                  // 26
          });                                                                                                  // 25
        }                                                                                                      // 30
                                                                                                               //
        return tasks;                                                                                          // 13
      }(),                                                                                                     // 13
      incompleteCount: function () {                                                                           // 32
        function incompleteCount() {                                                                           // 13
          return Tasks.find({                                                                                  // 33
            checked: {                                                                                         // 34
              $ne: true                                                                                        // 35
            }                                                                                                  // 34
          }).count();                                                                                          // 33
        }                                                                                                      // 38
                                                                                                               //
        return incompleteCount;                                                                                // 13
      }()                                                                                                      // 13
    });                                                                                                        // 13
  }                                                                                                            // 41
                                                                                                               //
  TodosListCtrl.prototype.addTask = function () {                                                              //
    function addTask(newTask) {                                                                                //
      // Insert a task into the collection                                                                     //
      Tasks.insert({                                                                                           // 45
        text: newTask,                                                                                         // 46
        createdAt: new Date()                                                                                  // 47
      });                                                                                                      // 45
                                                                                                               //
      // Clear form                                                                                            //
      this.newTask = '';                                                                                       // 51
    }                                                                                                          // 52
                                                                                                               //
    return addTask;                                                                                            //
  }();                                                                                                         //
                                                                                                               //
  TodosListCtrl.prototype.setChecked = function () {                                                           //
    function setChecked(task) {                                                                                //
      // Set the checked property to the opposite of its current value                                         //
      Tasks.update(task._id, {                                                                                 // 57
        $set: {                                                                                                // 58
          checked: !task.checked                                                                               // 59
        }                                                                                                      // 58
      });                                                                                                      // 57
    }                                                                                                          // 62
                                                                                                               //
    return setChecked;                                                                                         //
  }();                                                                                                         //
                                                                                                               //
  TodosListCtrl.prototype.removeTask = function () {                                                           //
    function removeTask(task) {                                                                                //
      Tasks.remove(task._id);                                                                                  // 65
    }                                                                                                          // 66
                                                                                                               //
    return removeTask;                                                                                         //
  }();                                                                                                         //
                                                                                                               //
  return TodosListCtrl;                                                                                        //
}();                                                                                                           //
                                                                                                               //
module.export("default",exports.default=(angular.module('todosList', [angularMeteor]).component('todosList', {
  templateUrl: 'imports/components/todosList/todosList.html',                                                  // 74
  controller: ['$scope', TodosListCtrl]                                                                        // 75
})));                                                                                                          // 73
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"api":{"tasks.js":["meteor/mongo",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// imports/api/tasks.js                                                                                        //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
module.export({Tasks:function(){return Tasks}});var Mongo;module.import('meteor/mongo',{"Mongo":function(v){Mongo=v}});
                                                                                                               //
var Tasks = new Mongo.Collection('tasks');                                                                     // 3
                                                                                                               //
if (Meteor.isServer) {                                                                                         // 5
  // This code only runs on the server                                                                         //
                                                                                                               //
  // e.g.:                                                                                                     //
  // Meteor.publish('tasks', function tasksPublication() {                                                     //
  //  return Tasks.find();                                                                                     //
  // });                                                                                                       //
}                                                                                                              // 12
                                                                                                               //
Meteor.methods({                                                                                               // 14
  // e.g.:                                                                                                     //
                                                                                                               //
  // 'tasks.insert' (text) {                                                                                   //
  //                                                                                                           //
  // },                                                                                                        //
                                                                                                               //
  // 'tasks.remove' (taskId) {                                                                                 //
  //                                                                                                           //
  // }                                                                                                         //
});                                                                                                            // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"client":{"main.html.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// client/main.html.js                                                                                         //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
                                                                                                               // 1
            Meteor.startup(function() {                                                                        // 2
              var attrs = {};                                                                                  // 3
              for (var prop in attrs) {                                                                        // 4
                document.body.setAttribute(prop, attrs[prop]);                                                 // 5
              }                                                                                                // 6
            });                                                                                                // 7
                                                                                                               // 8
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":["angular","angular-meteor","../imports/components/todosList/todosList",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// client/main.js                                                                                              //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var angular;module.import('angular',{"default":function(v){angular=v}});var angularMeteor;module.import('angular-meteor',{"default":function(v){angularMeteor=v}});var todosList;module.import('../imports/components/todosList/todosList',{"default":function(v){todosList=v}});
                                                                                                               // 2
                                                                                                               //
                                                                                                               // 4
                                                                                                               //
angular.module('simple-todos', [angularMeteor, todosList.name]);                                               // 6
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json",".html",".css",".scss"]});
require("./client/main.html.js");
require("./client/main.js");