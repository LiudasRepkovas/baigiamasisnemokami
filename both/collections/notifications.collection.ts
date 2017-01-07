import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Notification } from '../models/notification.model';

export const Notifications = new MongoObservable.Collection<Notification>('notifications');

function loggedIn() {
    return !!Meteor.user();
}

Notifications.deny({
  insert: ()=>{return true},
  update: ()=>{return true},
  remove: ()=>{return true}
});
