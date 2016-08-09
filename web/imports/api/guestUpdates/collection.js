import { Mongo } from 'meteor/mongo';

const guestUpdateSchema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  value: { type: String },  // 'INC', or 'DEC'
  age: { type: String }, // 'AGE_GROUP_1', 'AGE_GROUP_2', 'AGE_GROUP_3', 'AGE_GROUP_4', or 'AGE_GROUP_5'
  gender: { type: String }, // 'GENDER_MALE' or 'GENDER_FEMALE'
  timestamp: { type: Date },
});

const guestUpdatesCollection = new Mongo.Collection('guestUpdates');
guestUpdatesCollection.attachSchema(guestUpdateSchema);

export const GuestUpdates = guestUpdatesCollection;
