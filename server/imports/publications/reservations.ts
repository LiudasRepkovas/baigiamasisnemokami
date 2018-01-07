import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Reservations } from '../../../both/collections/reservations.collection';


Meteor.publish('reservations', function(item_id, options) {
  return Reservations.find({item:item_id});
});

Meteor.publish('item_reservations_count', function(item_id){
    Counts.publish(this, 'item_reservations', Reservations.collection.find({item: item_id, active: true}));
})