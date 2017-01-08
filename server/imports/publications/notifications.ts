import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Notifications } from '../../../both/collections/notifications.collection';


Meteor.publish('user_notifications', function() {
    if(this.userId){
        let query = {owner:this.userId};
        return Notifications.find(query);
    }
});

Meteor.publish('unread_notifications_count', function(){
    Counts.publish(this, 'notifications_count', Notifications.collection.find({owner:this.userId, seen:false}));

})