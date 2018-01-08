import { Component, OnInit, ApplicationRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(public router:Router, public ref: ApplicationRef, public zone: NgZone) {
  }

  ngOnInit(){
      this.autorunSub = MeteorObservable.autorun().subscribe(() => {
        this.messagesSub = MeteorObservable.subscribe('unread_messages_count').subscribe();
        this.notificationsSub = MeteorObservable.subscribe('unread_notifications_count').subscribe();
        this.notifications = Counts.get('notifications_count');
        this.messages = Counts.get('messages_count');
      });

  }

  logout() {
    // this.router.navigate(['/']);
    Meteor.logout(()=>{
      this.zone.run(()=>{
        this.ref.tick();
      })
    })
  }
}
