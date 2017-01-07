import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Items } from '../../../both/collections/items.collection';

Meteor.publish('items', function(query, options) {
  
  Counts.publish(this, 'numberOfItems', Items.collection.find(query), { noReady: true });

  return Items.find(query, options);
});

Meteor.publish('item', function(itemId: string) {
  return Items.find({_id:itemId});
});

Meteor.publish('user_items', function(user: string) {
  return Items.find({owner:user});
});


function queryBuilder(params){
  if(params != null){
    let query = {};
    if(params.category != ''){
      query["category"] = params.category;
    }
    
    
    
    if(params.search != ''){
      query["name"] = {$regex: params.search, $options: "i"};
    }
    return query;
  } else {
    return {};
  }
  
}