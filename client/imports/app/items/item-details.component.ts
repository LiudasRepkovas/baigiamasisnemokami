import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";

import 'rxjs/add/operator/map';

import { Items } from '../../../../both/collections/items.collection';
import { Item } from '../../../../both/models/item.model';
import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';

import template from './item-details.component.html';

@Component({
  selector: 'item-details',
  template
})
@InjectUser('user')
export class ItemDetailsComponent implements OnInit, OnDestroy {
  itemId: string;
  paramsSub: Subscription;
  item: Item;
  itemSub: Subscription;
  users: Observable<User>;
  user: Meteor.User;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['itemId'])
      .subscribe(itemId => {
        this.itemId = itemId;
        
        if (this.itemSub) {
          this.itemSub.unsubscribe();
        }

        this.itemSub = MeteorObservable.subscribe('item', this.itemId).subscribe(() => {
          MeteorObservable.autorun().subscribe(() => {
            this.item = Items.findOne({_id:this.itemId});
          });
        });
      });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.itemSub.unsubscribe();
  }
}