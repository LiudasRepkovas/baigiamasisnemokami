import {Categories} from '../both/collections/categories.collection';
import {Items} from '../both/collections/items.collection';

Meteor.methods({
  getCategories() {
    return Categories.find({}).fetch();
  },
  getCategoryName(id) {
    return Categories.findOne({_id:id});
  },
  getItemLocations() {
    return Items.find({}, {fields:{location:1}}).fetch();
  }
});