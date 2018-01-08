import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ApplicationRef } from '@angular/core';
import 'rxjs/operator/zip';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";
import {FormControl} from '@angular/forms';

import * as _ from 'lodash';

import { Categories } from '../../../../both/collections/categories.collection';

import template from './categories.html';
// import style from './item-details.component.scss';


@Component({
  selector: 'categories',
  template,

})
@InjectUser('user')
export class CategoriesComponent implements OnInit, OnDestroy {

  categories:any;
  categoriesSub:any;

  catInput = new FormControl();
  parent = new FormControl();
  

  

  constructor() {}

  ngOnInit() {

    this.categoriesSub = MeteorObservable.subscribe('categories').subscribe(()=>{
      this.categories = Categories.find({});
    });   
  
  }



  ngOnDestroy() {
  }

  addCategory(){
    MeteorObservable.call('addCategory', this.catInput.value).subscribe(()=>{
    })
  }

  removeCategory(id){
    MeteorObservable.call('removeCategory', id).subscribe(()=>{
    })
  }
}