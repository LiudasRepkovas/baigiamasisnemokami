import { Meteor } from 'meteor/meteor';

import { Parties } from '../../../both/collections/parties.collection';

Meteor.users.deny({
  update() { return true; }
})

Meteor.publish('uninvited', function (partyId: string) {
  const party = Parties.findOne(partyId);

  if (!party) {
    throw new Meteor.Error('404', 'No such party!');
  }

  return Meteor.users.find({
    _id: {
      $nin: party.invited || [],
      $ne: this.userId
    }
  });


});

Meteor.publish('user', function(userId: string){
  return Meteor.users.find({_id:userId});
})


Meteor.publish('users', function(){
  return Meteor.users.find({});
})

