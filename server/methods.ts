import {Categories} from '../both/collections/categories.collection';

Meteor.methods({
  getCategories() {
    return Categories.find({}).fetch();
  }
});