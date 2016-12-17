import { Meteor } from 'meteor/meteor';

import { Categories } from '../../../both/collections/categories.collection';

Meteor.publish('categories', function() {

  return Categories.find({});
});