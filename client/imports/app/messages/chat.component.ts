import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InjectUser } from "angular2-meteor-accounts-ui";
import * as _ from 'lodash';

import 'rxjs/add/operator/map';

import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';
import { Messages } from '../../../../both/collections/messages.collection';

import template from './chat.component.html';
import style from './chat.component.scss';

@Component({
    selector: 'chat',
    template,
    styles: [ style ]

})
@InjectUser('user')
export class ChatComponent implements OnInit, OnDestroy {

    addForm: FormGroup;
    itemId: string;
    paramsSub: Subscription;
    messagesSub: any;
    messages: any;
    usersSub: any;
    user: Meteor.User;
    userId: any;
    receiverId: any;
    receiver: any;
    messageText: any;
    autorunSub: any;


    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {

        this.addForm = this.formBuilder.group({
            messageText: ['', Validators.required]
        });

        this.paramsSub = this.route.params
            .map(params => params['userId'])
            .subscribe(userId => {
                this.usersSub = MeteorObservable.subscribe('user', userId).subscribe(()=>{
                    if (this.messagesSub) {
                        this.messagesSub.unsubscribe();
                    }
                    this.receiver = Users.findOne({_id:userId});
                    this.messagesSub = MeteorObservable.subscribe('user_chat', this.receiver._id).subscribe();
                    this.messages = Messages.find({}).zone();
                });
        });
    }

    addMessage(){

        if(this.addForm.valid){
            let newMessage = {
                body:this.addForm.value.messageText,
                to: this.receiver._id
            }
            Meteor.call('insertMessage', newMessage);
        }
        
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
        this.messagesSub.unsubscribe();
        this.usersSub.unsubscribe();
    }
}