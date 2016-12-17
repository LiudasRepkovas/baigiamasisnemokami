import { Component, Input} from '@angular/core';
import {OnDestroy, OnInit} from "@angular/core";
import {Observable, Subscription, Subject} from "rxjs";
import {Item} from "../../../../both/models/item.model";
import {MeteorObservable} from "meteor-rxjs";
import {Comments} from "../../../../both/collections/comments.collection";
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
      this.comments = Comments.find({item:this.itemId}).zone();
      this.commentsSub = MeteorObservable.subscribe('comments').subscribe();
  }
  
  ngOnDestroy() {
    this.commentsSub.unsubscribe();
  }
}