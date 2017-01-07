import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";
import * as _ from 'lodash';


import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';
import { Messages } from '../../../../both/collections/messages.collection';

import template from './chat-list.component.html';
import style from './chat-list.component.scss';

@Component({
    selector: 'chat-list',
    template,
    styles: [ style ]

})
@InjectUser('user')
export class ChatListComponent implements OnInit, OnDestroy {

    itemId: string;
    paramsSub: Subscription;
    messagesSub: any;
    messages: any;
    messageGroups: any;
    users: any;
    user: Meteor.User;
    usersSub: any;

    constructor(
    ) {}

    ngOnInit() {
        if (this.messagesSub) {
            this.messagesSub.unsubscribe();
        }

        this.usersSub = MeteorObservable.subscribe('users').subscribe(()=>{
            this.users = Users.find({}).fetch();
            this.messagesSub = MeteorObservable.subscribe('user_messages').subscribe(()=>{
            this.messages = Messages.find({}, {transform:(message)=>{
                let from = _.filter(this.users, {_id:message.from})[0];
                let to = _.filter(this.users, {_id:message.to})[0];
                message.from = from;
                message.to = to;
                return message;
            }}).fetch();
            this.messageGroups = _.groupBy(this.messages, (message:any)=>{
                if(message.from._id == Meteor.userId()){
                    return message.to._id;
                }
                if(message.to._id == Meteor.userId()){
                    return message.from._id;
                }
            })
            console.log(this.messageGroups)
        })
        })
        
    }

    ngOnDestroy() {
        this.messagesSub.unsubscribe();
    }
}