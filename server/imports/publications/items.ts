import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Items } from '../../../both/collections/items.collection';

Meteor.publish('items', function(query, options) {
  query['deleted'] = {$ne: true};
  query['active'] = true;
  
  Counts.publish(this, 'numberOfItems', Items.collection.find(query), { noReady: true });

  return Items.find(query, options);
});

Meteor.publish('item', function(itemId: string) {
  return Items.find({_id:itemId, deleted: {$ne: true}});
});

Meteor.publish('user_items', function(user: string) {
  return Items.find({owner:user, deleted: {$ne: true}});
});


// function queryBuilder(params){
//   if(params != null){
//     let query = {};
//     if(params.category != ''){
//       query["category"] = params.category;
//     }
    
    
    
//     if(params.search != ''){
//       query['$or'] = [
//         {'name':  {$regex: params.search, $options: "i"}},
//         { }
//       ]
//       query["name"] =;
//     }
//     return query;
//   } else {
//     return {};
//   }
  
// }