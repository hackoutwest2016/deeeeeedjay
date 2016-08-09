import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server

  // e.g.:
  // Meteor.publish('tasks', function tasksPublication() {
  //  return Tasks.find();
  // });
}

Meteor.methods({
  // e.g.:

  // 'tasks.insert' (text) {
  //
  // },

  // 'tasks.remove' (taskId) {
  //
  // }
});