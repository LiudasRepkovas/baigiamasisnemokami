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

import template from './item-details.component.html';
import style from './item-details.component.scss';

@Component({
  selector: 'item-details',
  template,
  styles: [ style ]

})
@InjectUser('user')
export class ItemDetailsComponent implements OnInit, OnDestroy {

  itemId: string;
  paramsSub: Subscription;
  item: Item;
  itemSub: Subscription;
  users: Observable<User>;
  user: Meteor.User;
  imagesSubs: any;
  images: any;
  selectedImage:any;
  categories:any;
  categoriesSub:any;
  owner:any;
  ownerSub: any;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categoriesSub = MeteorObservable.subscribe('categories').subscribe(()=>{
      this.categories = Categories.find({}).fetch();
    });
  
    this.paramsSub = this.route.params
      .map(params => params['itemId'])
      .subscribe(itemId => {
        this.itemId = itemId;
        
        if (this.itemSub) {
          this.itemSub.unsubscribe();
        }

        this.itemSub = MeteorObservable.subscribe('item', this.itemId).subscribe(() => {
            this.item = Items.findOne({_id:this.itemId},{  
                transform:(item)=>{
                  let category = _.filter(this.categories, {_id:item.category})[0];
                  if(!category){
                    category = {name:"Be kategorijos"};
                  }
                  item.category = category;
                  return item;
                }
            });

            console.log(this.item);

            if(this.item.owner){
              this.ownerSub = MeteorObservable.subscribe('user', this.item.owner).subscribe(()=>{
                this.owner = Users.findOne({_id:this.item.owner});
                console.log(this.owner);
              });
            } 

            if(this.item.images && this.item.images.length > 0){
              this.imagesSubs = MeteorObservable.subscribe('item_images', this.item.images).subscribe(()=>{
                this.images = Images.find({}).fetch();
                this.selectedImage = this.images[0];
              });
            }
        });
      });
  }

  setPreview(image){
    this.selectedImage = image;
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.itemSub.unsubscribe();
    if(this.imagesSubs){
      this.imagesSubs.unsubscribe();
    }
  }
}