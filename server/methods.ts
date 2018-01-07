import {Categories} from '../both/collections/categories.collection';
import {Items} from '../both/collections/items.collection';
import {Messages} from '../both/collections/messages.collection';
import {Notifications} from '../both/collections/notifications.collection';
import {Comments} from '../both/collections/comments.collection';
import {Reservations} from '../both/collections/reservations.collection';

import * as _ from 'lodash';
import {isAdmin as isAdmin} from './imports/functions';

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
    if(item.expires_at < _.now()){
      throw new Meteor.Error('expires-in-the-past', "Item can not expire in the past");
    }

    item.timestamp = _.now();
    item['updated'] = null;

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
      item.updated = _.now();
      if(item.expires_at > _.now()){
        item.active = true;        
      }
      Items.update({_id:item._id, owner:this.userId}, item);
    }
    return true;
  },

  insertComment(comment){

    if(this.userId){

      comment['owner'] = this.userId;
      comment['timestamp'] = _.now();
      Comments.insert(comment);

      let item = Items.findOne(comment.item);
      let owner = Meteor.users.findOne(item.owner);

      if(item.owner != this.userId){
        Notifications.insert({
          owner: Items.find({_id:comment.item}).fetch()[0].owner,
          text: owner.profile.name+" pakomentavo tavo skelbimą!",
          url: 'item/id/'+comment.item,
          timestamp: _.now(),
          seen: false,
        })
      } 
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
  },

  removeItem(itemId){
    if(this.userId){
      let item = Items.findOne({_id:itemId});
      if(this.userId == item.owner || isAdmin(this.userId)){
        Items.update({_id:itemId}, {$set:{deleted: true}});
        Notifications.remove({url: {$regex: itemId}})
      }
    }
  },
  deleteComment(comment_id){
    Comments.remove({_id:comment_id});
  },

  toggleReservation(item_id){
    if(this.userId){

      let item = Items.findOne({_id:item_id});


      let reservation = Reservations.findOne({owner: this.userId, item: item_id});
      let owner = Meteor.users.findOne({_id: item.owner});
      let user = Meteor.users.findOne({_id: this.userId});
      
      if(!reservation){
          Reservations.insert({owner: this.userId, item: item_id, timestamp: _.now(), active: true});    
          Notifications.insert({
            owner: Items.find({_id:item_id}).fetch()[0].owner,
            text: user.profile.name+" rezervavo tavo skelbimą pavadinimu '" + item.name + "'!",
            url: 'item/id/'+item._id,
            timestamp: _.now(),
            seen: false,
          })  
      } else {
        let status = reservation.active;
        console.log(item)
        Reservations.update({_id: reservation._id}, {$set:{active: !status, timestamp: _.now()}});
        if(!status){
          Notifications.insert({
            owner: Items.find({_id:item_id}).fetch()[0].owner,
            text: user.profile.name+" rezervavo tavo skelbimą pavadinimu '" + item.name + "'!",
            url: 'item/id/'+item._id,
            timestamp: _.now(),
            seen: false,
          })  
        }
        Reservations.update({_id: reservation._id}, {$set:{active: !status, timestamp: _.now()}});
      }
      
    }
  },

  getReservationsCount(item_id){
    if(this.userId){
      return Reservations.find({ item: item_id, active: true}).fetch().length;      
    }
  }
});