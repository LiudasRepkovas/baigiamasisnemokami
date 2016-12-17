import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Items } from '../../../../both/collections/items.collection';
import { InjectUser } from "angular2-meteor-accounts-ui";
import * as _ from "lodash";
import { MapsAPILoader } from 'angular2-google-maps/core';

import template from './item-form.component.html';
import style from './item-form.component.scss';


declare var google:any;

@Component({
  selector: 'item-form',
  template,
  styles: [ style ]
})
@InjectUser("user")
export class ItemFormComponent implements OnInit, AfterViewChecked {
  
  @ViewChildren('autocomplete') autocompleteInput : ElementRef;
  addForm: FormGroup;
  images: string[] = [];
  category: "kategorija";
  location: any = {lat: 54.687157, lng: 25.279652};

  constructor(private formBuilder: FormBuilder,  private _loader: MapsAPILoader) {
    //TODO:sutvarkyt kad gautu userio lokacija
    let userLocation = UserLocation.get();
    if(userLocation.latitude){
      this.location = {
            lat: userLocation.latitude,
            lng: userLocation.longitude
          };
    }
    console.log(this.location);
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngAfterViewChecked(){
    this.autocomplete();
  }

  autocomplete() {
        this._loader.load().then(() => {
          console.log('nativeElement:');
          console.log(this.autocompleteInput.nativeElement);
          console.log('rawElement:');
          console.log(this.autocompleteInput);
            let autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput, {});
            google.maps.event.addListener(autocomplete, 'place_changed', () => {
                let place = autocomplete.getPlace();
                console.log(place);
            });
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
        category: this.category,
        images: this.images,
        owner: Meteor.userId(),
        active: true,
        deleted: false,
        timestamp: _.now(),
        expires: _.now(),
        location: this.location
      });

      this.addForm.reset();
    }
  }

  onImage(imageId: string) {
    this.images.push(imageId);
  }

  mapClicked($event) {
    this.location = $event.coords;
  }

}
