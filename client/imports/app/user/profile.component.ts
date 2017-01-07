import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";
import * as _ from 'lodash';

import 'rxjs/add/operator/map';

import { Items } from '../../../../both/collections/items.collection';
import { Images } from '../../../../both/collections/images.collection';
import { Item } from '../../../../both/models/item.model';
import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';
import { Categories } from '../../../../both/collections/categories.collection';

import template from './profile.component.html';
import style from './profile.component.scss';

@Component({
  selector: 'user-profile',
  template,
  styles: [ style ]

})
@InjectUser('user')
export class UserProfileComponent implements OnInit, OnDestroy {

  itemId: string;
  paramsSub: Subscription;
  item: Item;
  itemSub: Subscription;
  users: Observable<User>;
  user: Meteor.User;
  userSub: any;
  userDisplayed: any;
  userId:any;
  imagesSubs: any;
  images: any;
  categories:any;
  categoriesSub:any;

  items:any;
  itemsSub:any;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categoriesSub = MeteorObservable.subscribe('categories').subscribe(()=>{
      this.categories = Categories.find({}).fetch();
    });
  
    this.paramsSub = this.route.params
      .map(params => params['userId'])
      .subscribe(userId => {
        this.userId = userId;
        
        if (this.userSub) {
          this.userSub.unsubscribe();
        }

        this.userSub = MeteorObservable.subscribe('user', this.userId).subscribe(() => {
            this.userDisplayed = Users.findOne({_id:this.userId});

            console.log(this.userDisplayed);

            this.itemsSub = MeteorObservable.subscribe('user_items', this.userDisplayed._id).subscribe(()=>{
                this.items = Items.find({}, {transform:(item)=>{
                    let category = _.filter(this.categories, {_id:item.category})[0];
                    if(!category){
                        category = {name:"Be kategorijos"};
                    }
                    item.category = category;
                    return item;
                }});
                console.log(this.items.toArray());
            });
        });
      });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.userSub.unsubscribe();
    if(this.itemsSub){
      this.itemsSub.unsubscribe();
    }
  }

  saveProfileData(){
    Meteor.call('saveUserProfileData', this.userDisplayed.profile);
  }
}