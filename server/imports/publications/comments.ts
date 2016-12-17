import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Comments } from '../../../both/collections/comments.collection';

Meteor.publish('comments', function() {

//   Counts.publish(this, 'numberOfItems', Items.collection.find({}), { noReady: true });

  return Comments.find({});
});