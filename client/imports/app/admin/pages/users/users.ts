import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MeteorComponent} from 'angular2-meteor';
import * as moment from 'moment';

import template from './users.html';

@Component({
  selector: 'usersAdmin-page',
  template
})
export class AdminUsersComponent extends MeteorComponent {
  rows: any[] = [];
  length: number = 0;
  data: any[] = [];

  idToRemove: string;

  constructor(private router: Router){
    super();

    Meteor.subscribe('adminUsers');
    this.autorun(() => {
      if(Meteor.user()){
        this.data = this.formatData(Meteor.users.find({}, {sort: {createdAt: -1}}).fetch());
        this.length = this.data.length;
      }
    });
  }

  formatData(arr: any[]) : any[] {
    return arr.map((item) => {
      return [
        item._id,
        item.profile ? item.profile.first_name + ' ' + item.profile.last_name : 'Unknown',
        item.emails ? item.emails[0].address : 'None',
        item.profile && item.profile.mentor == true ? 'Yes' : 'No',
        moment(item.createdAt).format('YYYY-MM-DD HH:mm')
      ];
    });
  }

  targetForRemoval(_id: string){
    this.idToRemove = _id;
  }

  remove(){
    if(this.idToRemove != null){
      Meteor.call('disableUser', this.idToRemove);
    }
    this.idToRemove = null;
  }
}
