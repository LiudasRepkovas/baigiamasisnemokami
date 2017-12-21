import { Component, Input} from '@angular/core';
import {OnDestroy, OnInit} from "@angular/core";
import {Observable, Subscription, Subject} from "rxjs";
import {Item} from "../../../../both/models/item.model";
import {MeteorObservable} from "meteor-rxjs";
import {Comments} from "../../../../both/collections/comments.collection";
import {Users} from "../../../../both/collections/users.collection";
import template from './comments-list.component.html';
import {MatSnackBar} from '@angular/material';
import { InjectUser } from "angular2-meteor-accounts-ui";




@Component({
  selector: 'comments-list',
  template,
})
@InjectUser('user')
export class CommentsListComponent implements OnInit, OnDestroy {
    
  @Input() itemId;
  comments: Observable<any[]>;
  commentsSub: Subscription;
  autorunSub: Subscription;
  user:any = Meteor.user();
  usersSub: any;

  constructor(private snackBar:MatSnackBar) {
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

  deleteComment(comment_id){
    Meteor.call('deleteComment', comment_id, (error, response)=>{
      if(!error){
        this.openSnackBar('Komentaras sėkmingai ištrintas');
      }
    })
  }
  
  ngOnDestroy() {
    this.commentsSub.unsubscribe();
  }
  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}