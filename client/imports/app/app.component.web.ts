import { Component, OnInit } from '@angular/core';
import {Counts} from "meteor/tmeasday:publish-counts";
import {MeteorObservable} from "meteor-rxjs";

import style from './app.component.scss';
import template from './app.component.web.html';
import {InjectUser} from "angular2-meteor-accounts-ui";
import { MapsAPILoader } from 'angular2-google-maps/core';


@Component({
  selector: 'app',
  template,
  styles: [ style ]
})
@InjectUser('user')
export class AppComponent implements OnInit {

  notifications:any;
  notificationsSub:any;
  messagesSub:any;
  messages:any;
  autorunSub:any;


  constructor() {
  }

  ngOnInit(){
    this.autorunSub = MeteorObservable.autorun().subscribe(() => {
      this.notifications = Counts.get('notifications_count');
      this.messages = Counts.get('messages_count');
    });
  }

  logout() {
    Meteor.logout();
  }
}
