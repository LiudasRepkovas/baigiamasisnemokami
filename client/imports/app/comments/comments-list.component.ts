import { Component, Input} from '@angular/core';
import {OnDestroy, OnInit} from "@angular/core";
import {Observable, Subscription, Subject} from "rxjs";
import {Item} from "../../../../both/models/item.model";
import {MeteorObservable} from "meteor-rxjs";
import {Comments} from "../../../../both/collections/comments.collection";
import {Users} from "../../../../both/collections/users.collection";
import template from './comments-list.component.html';


@Component({
  selector: 'comments-list',
  template,
})

export class CommentsListComponent implements OnInit, OnDestroy {
    
  @Input() itemId;
  comments: Observable<any[]>;
  commentsSub: Subscription;
  autorunSub: Subscription;
  user: Meteor.User;

  constructor() {
  }

  ngOnInit() {

      this.usersSub = MeteorObservable.subscribe('users').subscribe(()=>{
        this.comments = Comments.find({item:this.itemId}, {transform:(comment)=>{
          let owner = Users.findOne({_id:comment.owner});
          comment.owner = owner;
          return comment;
        }}).zone();
      this.commentsSub = MeteorObservable.subscribe('comments').subscribe();
      });
      
  }
  
  ngOnDestroy() {
    this.commentsSub.unsubscribe();
  }
}