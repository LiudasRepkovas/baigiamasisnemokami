import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Items } from '../../../../both/collections/items.collection';
import { InjectUser } from "angular2-meteor-accounts-ui";
import * as _ from "lodash";
import { MapsAPILoader } from 'angular2-google-maps/core';
import {Subject, Subscription, Observable} from "rxjs";
import {MeteorObservable} from "meteor-rxjs";
import {Categories} from "../../../../both/collections/categories.collection";

import template from './item-form.component.html';
import style from './item-form.component.scss';


declare var google:any;

@Component({
  selector: 'item-form',
  template,
  styles: [ style ]
})
@InjectUser("user")
export class ItemFormComponent implements OnInit, AfterViewInit {
  
  @ViewChild('autocomplete') autocompleteInput : ElementRef;
  addForm: FormGroup;
  images: string[] = [];
  location: any = {lat: 54.687157, lng: 25.279652};
  address: any = "Vilnius, Lithuania";
  categories: any;
  loading: boolean;

  constructor(private formBuilder: FormBuilder,  private _loader: MapsAPILoader) {
    this.loading = true;
    //TODO:padaryt kad lauktu kol suras useri bl
    //TODO:sutvarkyt kad gautu userio lokacija

    let userLocation = UserLocation.get();
    if(userLocation.latitude){
      this.location = {
            lat: userLocation.latitude,
            lng: userLocation.longitude
          };
    }

    //TODO:get categories with method instead of subscription
  }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngAfterViewInit(){
    Meteor.call('getCategories', (error, result)=>{
      this.categories = result;
      this.loading = false;
    });
  }

  addItem(): void {
    if (!Meteor.userId()) {
      alert('Please log in to add a item');
      return;
    }

    if (this.addForm.valid) {
      Items.insert({
        name: this.addForm.value.name,
        description: this.addForm.value.description,
        category: this.addForm.value.category,
        images: this.images,
        owner: Meteor.userId(),
        active: true,
        deleted: false,
        timestamp: _.now(),
        expires: _.now(),
        location: this.location,
        address: this.address
      });

      this.addForm.reset();

    }
  }

  onImage(imageId: string) {
    this.images.push(imageId);
  }

  resetImages(){
    this.images = [];
  }

}
