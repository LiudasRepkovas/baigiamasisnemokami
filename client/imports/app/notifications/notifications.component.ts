import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";
import * as _ from 'lodash';

import 'rxjs/add/operator/map';

import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';
import { Notifications } from '../../../../both/collections/notifications.collection';

import template from './notifications.component.html';
import style from './notifications.component.scss';
import { UrlSegment } from '@angular/router/src/url_tree';

@Component({
  selector: 'notifications-list',
  template,
  styles: [ style ]

})
@InjectUser('user')
export class NotificationsComponent implements OnInit, OnDestroy {

  itemId: string;
  users: Observable<User>;
  user: Meteor.User;
  notificationsSub: any;
  notifications: any;

  items:any;
  itemsSub:any;

  constructor(
  ) {}

  ngOnInit() {

      this.notificationsSub = MeteorObservable.subscribe('user_notifications').subscribe();
      this.notifications = Notifications.find({}, {sort:{timestamp: -1}}).map((notification: any) => {
        notification.url = encodeURIComponent(notification.url);
        return notification;
      }).zone();
      Meteor.call('notifications_seen');
  }

  ngOnDestroy() {
    this.notificationsSub.unsubscribe();
  }
}