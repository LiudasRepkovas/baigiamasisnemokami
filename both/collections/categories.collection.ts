import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Category } from '../models/category.model';

export const Categories = new MongoObservable.Collection<Category>('categories');

function admin() {
  return !!Meteor.user();
}

Categories.allow({
  insert: admin,
  update: admin,
  remove: admin
});

