import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MeteorObservable} from "meteor-rxjs";

import style from './app.component.scss';
import template from './app.component.html';
import { MapsAPILoader } from 'angular2-google-maps/core';


@Component({
  selector: 'app',
  template,
  //styles: [ style ]
})
export class AppComponent implements OnInit {

  notifications:any;
  notificationsSub:any;
  messagesSub:any;
  messages:any;
  autorunSub:any;


  constructor(public router:Router) {
  }

  ngOnInit(){
    // if(Meteor.userId()){
    //   this.autorunSub = MeteorObservable.autorun().subscribe(() => {
    //     this.messagesSub = MeteorObservable.subscribe('unread_messages_count').subscribe();
    //     this.notificationsSub = MeteorObservable.subscribe('unread_notifications_count').subscribe();
    //     this.notifications = Counts.get('notifications_count');
    //     this.messages = Counts.get('messages_count');
    //   });
    // }
  }

  logout() {
    this.router.navigate(['/']);
    Meteor.logout();
  }
}
