import {Component} from '@angular/core';
import * as moment from 'moment';

import template from './create.html';

@Component({
  selector: 'userCreate-page',
  template
})
export class AdminCreateUserComponent {
  email: string;
  profile: any = {
    address: {},
    spec_fields: []
  };

  constructor(){}

  create(){
    Meteor.call('adminCreateUser', {email: this.email, password: this.email, profile: this.profile}, (error) => {
      console.log(error);
    });
  }
}
