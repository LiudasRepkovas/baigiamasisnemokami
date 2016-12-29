import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Items } from '../../../both/collections/items.collection';


Meteor.publish('locations', function(query, options) {
  
  Counts.publish(this, 'numberOfLocations', Items.collection.find({}), { noReady: true });

  return Items.find({});
});