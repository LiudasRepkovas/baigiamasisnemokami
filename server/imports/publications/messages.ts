import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Messages } from '../../../both/collections/messages.collection';


Meteor.publish('user_messages', function() {
    if(this.userId){
        let query = {$or:[{from:this.userId}, {to:this.userId}]};
        console.log(query);
        return Messages.find();
    }
});

Meteor.publish('user_chat', function(userId) {
    let query = {$or:[{from:this.userId, to:userId} , {to:this.userId, from:userId}]};
    console.log(query);
    console.log(Messages.find(query).fetch());
    return Messages.find({$or:[{from:this.userId, to:userId}, {to:this.userId, from:userId}]});

});
Counts.publish('messages_count', Messages.collection.find({to:this.userId, seen:false}));

Meteor.publish('all_messages', function() {
    return Messages.find({});
});