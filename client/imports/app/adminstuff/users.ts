import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ApplicationRef } from '@angular/core';
import 'rxjs/operator/zip';
import { Meteor } from 'meteor/meteor';
import {Users} from '../../../../both/collections/users.collection'
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";
import {FormControl} from '@angular/forms';

import * as _ from 'lodash';

import { Categories } from '../../../../both/collections/categories.collection';

import template from './users.html';
// import style from './item-details.component.scss';


@Component({
  selector: 'users-list',
  template,

})
@InjectUser('user')
export class UserListComponent implements OnInit, OnDestroy {

  users:any;
  usersSub:any;


  searchInput = new FormControl();  

  

  constructor() {}

  ngOnInit() {

    this.usersSub = MeteorObservable.subscribe('users').subscribe(()=>{
      this.users = Users.find({'profile.banned':{$ne:true}});
    });   
  
  }



  ngOnDestroy() {
  }

  banUser(id){
    MeteorObservable.call('banUser', id).subscribe(()=>{
    })
  }

  removeCategory(id){
    // MeteorObservable.call('removeCategory', id).subscribe(()=>{

    // })
  }
}