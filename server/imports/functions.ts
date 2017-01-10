export function isAdmin(userId){
    return Meteor.users.findOne(userId).profile.admin;
}