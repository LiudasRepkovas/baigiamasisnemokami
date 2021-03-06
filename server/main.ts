import { Meteor } from 'meteor/meteor';

import {loadCategories} from './imports/fixtures/categories';
import {Items} from '../both/collections/items.collection';
import {Notifications} from '../both/collections/notifications.collection';


import './methods';
import './imports/publications/parties';
import './imports/publications/users';
import './imports/publications/images';
import './imports/publications/items';
import './imports/publications/comments';
import './imports/publications/categories';
import './imports/publications/messages';
import './imports/publications/notifications';
import './imports/publications/reservations';


const FB = Npm.require('fb');
const Future = Npm.require('fibers/future');

import * as _ from 'lodash';

const kms_in_degree = 111.12; 


Meteor.startup(() => {
    createIndexes()
    loadCategories();


    SyncedCron.add({
      name: 'Deactivating items',
      schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 30 seconds');
      },
      job: function() {
        let items = Items.find({expires_at: {$lt: _.now()}, active: {$ne:false}}).fetch();
        let ids = [];
        for(let item of items){
          ids.push(item._id);
          Notifications.insert({
            owner: item.owner,
            text: "Jūsų skelbimas pavadinimu " + item.name +  "baigė galioti!",
            url: 'item/id/'+item._id,
            timestamp: _.now(),
            seen: false,
          })
        }

        Items.update({_id:{$in:ids}}, {$set: {active: false}}, {multi:true});

      }
    });
    
    SyncedCron.start();


// ServiceConfiguration.configurations.remove({
//     service: "facebook"
// });

// ServiceConfiguration.configurations.insert({
//     service: "facebook",
//     appId: '360039191135807',
//     secret: '7e56776f6c3da2e57f8bb23fb0f0b98c'
// });

Accounts.onCreateUser(function (options, user) {
// We still want the default hook's 'profile' behavior.
    console.log(options, user);
    if (options.profile) {
        if(options.profile.createdByAdmin == true) {
        delete options.profile.createdByAdmin;
        user.emails[0].verified = true;
        }
        user['profile'] = options.profile;
    }

    if(options.services) {
        if(options.services.facebook) {
          user.services.facebook = options.services.facebook;
          user.emails[0].verified = true;
          user['profile']['name'] = options.services.facebook.name,
          user['p']
        }
    }

    return user;
    /* else {
        throw new Meteor.Error('no-profile-data', 'No profile data provided.');
        }*/
});
Accounts.validateLoginAttempt(function(options) {
  /* options:
    type            (String)    The service name, such as "password" or "twitter".
    allowed         (Boolean)   Whether this login is allowed and will be successful.
    error           (Error)     When allowed is false, the exception describing why the login failed.
    user            (Object)    When it is known which user was attempting to login, the Meteor user object.
    connection      (Object)    The connection object the request came in on.
    methodName      (String)    The name of the Meteor method being used to login.
    methodArguments (Array)     An array of the arguments passed to the login method
  */

  // If the login has failed, just return false.
  if (!options.allowed) {
    return false;
  }

  if (options.user && options.user.profile && options.user.profile.banned) {
    throw new Meteor.Error('user-banned', 'This account has been disabled. Contact support for more information.');
  }

  if(options.type == 'resume') {
    return true;
  }

  return true;

  // Check the user's email is verified. If users may have multiple
  // Email addresses (or no email address) you'd need to do something
  // More complex.
});

Accounts.registerLoginHandler(function(options) : any {

    console.log(options);
    console.log('aaa');

    if(!options.facebookWebLoginData) {
        return undefined; // Don't handle
    }

        const accessToken = options.facebookWebLoginData.accessToken;
        const email = options.facebookWebLoginData.email;
        const userId = options.facebookWebLoginData.id;




        // If no authData supplied, return error
        if (!accessToken) {
          return {
            error: new Meteor.Error(Accounts.LoginCancelledError.numericError, 'Insufficient information supplied'),
            type: 'FacebookDataError'
          };
        }

        let fb_data = getFacebookProfileData(accessToken);
        console.log(fb_data);

        let user = Meteor.users.findOne({'services.facebook.id': fb_data.id});
        
        if(!user) {
          user = Meteor.users.findOne({'emails.0.address': fb_data.email});
        }
        if(user) {
          Meteor.users.update(user._id, {$set: {'services.facebook': fb_data}});
          return {type: 'facebook', userId: user._id};
        } else {
            let userId = Accounts.createUser({username:fb_data.email, email:fb_data.email});
            Meteor.users.update({_id: userId}, {$set:{'services.facebook': fb_data, 'profile.name': fb_data.name}});
            Accounts.sendEnrollmentEmail(userId);
            return {type: 'facebook', userId: userId};
        }
      });


});

function getFacebookProfileData(accessToken: string) : any {
    let extended = extendFacebookAccessToken(accessToken);
  
    FB.options({
      appId: Meteor.settings['facebook'].appId,
      appSecret: Meteor.settings['facebook'].appSecret,
      redirectUri: Meteor.settings['facebook'].redirectURI
    });
  
    let future = new Future();
      FB.api('/me', {access_token: extended.accessToken, fields: ['email', 'first_name', 'id', 'last_name', 'link', 'locale', 'name']}, (response) => {
      if(!response || (response && response.error)) {
        future.return('error');
      } else {
        response['accessToken'] = extended.accessToken;
        response['expiresAt'] = extended.expiresAt;
        future.return(response);
      }
    });
    let result = future.wait();
    return result;
  }

  function extendFacebookAccessToken(accessToken: string) : any {
    let future = new Future();
  
    FB.api(
    'oauth/access_token',
    {
      client_id: Meteor.settings['facebook'].appId,
      client_secret: Meteor.settings['facebook'].secret,
      fb_exchange_token: accessToken,
      grant_type: 'fb_exchange_token'
    },
    function (res) {
      if(!res || res.error) {
        future.return({error: !res ? 'error occurred' : res.error});
      } else {
        future.return({
          accessToken: res.access_token,
          expiresAt: res.expires ? _.now() + res.expires * 1000 : 0
        });
      }
    });
  
    return future.wait();
  }

  function createIndexes(){
    Items.collection._ensureIndex({location: "2d"});
    Items.collection._ensureIndex({location: "2dsphere"});
    
    
  }