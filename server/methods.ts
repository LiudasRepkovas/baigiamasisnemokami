import {Categories} from '../both/collections/categories.collection';
import {Items} from '../both/collections/items.collection';
import {Messages} from '../both/collections/messages.collection';
import {Notifications} from '../both/collections/notifications.collection';
import {Comments} from '../both/collections/comments.collection';
import * as _ from 'lodash';

Meteor.methods({
  getCategories() {
    return Categories.find({}).fetch();
  },
  getCategoryName(id) {
    return Categories.findOne({_id:id});
  },
  getItemLocations() {
    return Items.find({}, {fields:{location:1}}).fetch();
  },
  insertItem(item){
    Items.insert(item);
    return true;
  },
  insertMessage(message){
    message['from'] = this.userId;
    message['timestamp'] = _.now();
    message['seen'] = false;
    Messages.insert(message);
    return true;
  },
  updateItem(item){
    if(item.owner == this.userId){
      Items.update({_id:item._id, owner:this.userId}, item);
    }
    return true;
  },
  insertComment(comment){

    if(this.userId){

      comment['owner'] = this.userId;
      comment['timestamp'] = _.now();
      Comments.insert(comment);

      let commenter = Meteor.users.findOne(comment.owner);

      Notifications.insert({
        owner: Items.find({_id:comment.item}).fetch()[0].owner,
        text: commenter.profile.name+" pakomentavo tavo skelbimą!",
        url: Meteor.absoluteUrl()+'items/id/'+comment.item,
        timestamp: _.now(),
        seen: false,
      })
    }

    
  },
  markChatRead(userId){
    if(this.userId){
      Messages.update({from:userId, to:this.userId}, {$set:{seen:true}}, {multi:true});
    }
  },
  notifications_seen(){
    if(this.userId){
      console.log("semiu notifikeisinus")
      console.log({owner:this.userId});
      Notifications.update({owner:this.userId}, {$set:{seen:true}}, {multi:true});
    }
  },
  saveUserProfileData(data){
    if(this.userId){
      Meteor.users.update(Meteor.userId(), {$set: {profile: {
        name:data.name,
        phone:data.phone
      }}});
    }
  }
});