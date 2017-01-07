import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comments } from '../../../../both/collections/comments.collection';
import { InjectUser } from "angular2-meteor-accounts-ui";
import template from './comments-form.component.html';
import * as _ from 'lodash';

@Component({
  selector: 'comments-form',
  template
})
@InjectUser("user")
export class CommentsFormComponent implements OnInit {

  @Input() itemId;
  addForm: FormGroup;
  images: string[] = [];

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      body: ['', Validators.required]
    });
  }

  addComment(): void {
    if (!Meteor.userId()) {
      alert('Please log in to comment!');
      return;
    }

    if (this.addForm.valid) {
      Meteor.call('insertComment', {
        body: this.addForm.value.body,
        item: this.itemId,
        owner: Meteor.userId(),
        timestamp: _.now(),
        deleted: false
      })

      this.addForm.reset();
    }
  }
}
