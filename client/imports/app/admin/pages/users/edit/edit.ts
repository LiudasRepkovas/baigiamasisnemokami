import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';

import template from './edit.html';

@Component({
  selector: 'userEdit-page',
  template
})
export class AdminEditUserComponent implements OnInit, OnDestroy {
  item: any;
  sub: any;

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.item = Meteor.users.findOne({_id: params['id']});
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  update(){
    Meteor.call('updateUser', this.item._id, this.item);
  }

  updateSpecFields(option: number){
    let index = this.item.profile.spec_fields.indexOf(option);
    if(index > -1){
      this.item.profile.spec_fields.splice(index, 1);
    }
    else {
      this.item.profile.spec_fields.push(option);
    }
  }
}
