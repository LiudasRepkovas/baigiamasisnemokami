import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Items } from '../../../both/collections/items.collection';

Meteor.publish('items', function( options) {
  
  Counts.publish(this, 'numberOfItems', Items.collection.find({}), { noReady: true });

  return Items.find({}, options);
});
Meteor.publish('item', function(itemId: string) {
  return Items.find({_id:itemId});
});