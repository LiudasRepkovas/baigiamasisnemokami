import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Items } from '../../../../both/collections/items.collection';
import { InjectUser } from "angular2-meteor-accounts-ui";
import { ActivatedRoute } from '@angular/router';
import * as _ from "lodash";
import { MapsAPILoader } from 'angular2-google-maps/core';
import {Subject, Subscription, Observable} from "rxjs";
import {MeteorObservable} from "meteor-rxjs";
import {Categories} from "../../../../both/collections/categories.collection";
import {Images} from "../../../../both/collections/images.collection";

import template from './item-form.component.html';
import style from './item-form.component.scss';


declare var google:any;

@Component({
  selector: 'item-form',
  template,
  styles: [ style ]
})
@InjectUser("user")
export class ItemFormComponent implements AfterViewInit, OnInit {
  
  @ViewChildren('autocomplete') autocompleteInput : QueryList;
  addForm: FormGroup;
  images: any[] = [];
  location: any ;
  address: any = "Vilnius, Lithuania";
  categories: any;
  loading: boolean;
  categoriesSub:any;
  paramsSub:any;
  itemId:any;
  item:any;
  itemSub:any;
  imagesSubs:any;

  constructor(private formBuilder: FormBuilder,  private _loader: MapsAPILoader, private route: ActivatedRoute) {

    this.location = {lat: 54.687157, lng: 25.279652};
    this.loading = false;
    //TODO:padaryt kad lauktu kol suras useri bl
    //TODO:sutvarkyt kad gautu userio lokacija

    let userLocation = UserLocation.get();
    if(userLocation.latitude){
      this.location = {
            lat: userLocation.latitude,
            lng: userLocation.longitude
          };
    }
  }

  ngOnInit(){

    // this.paramsSub = this.route.params.map(params => params['itemId']).subscribe(itemId => {this.itemId = itemId;});

    // if(this.itemId){
    //   this.itemSub = MeteorObservable.subscribe('item', this.itemId).subscribe(() => {
    //     this.item = Items.findOne({_id:this.itemId});
    //     console.log(this.item);
    //   });
    // } 

    // this.addForm = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   description: ['', Validators.required],
    //   location: ['', Validators.required],
    //   category: ['', Validators.required]
    // });

    // this.categoriesSub = MeteorObservable.subscribe('categories').subscribe(()=>{
    //   this.categories = Categories.find({});
    // });
  }

    

  ngAfterViewInit(){
    this.autocomplete();
  }

  autocomplete() {
        this._loader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.toArray()[0].nativeElement , {});
            google.maps.event.addListener(autocomplete, 'place_changed', () => {
                let place = autocomplete.getPlace();
                console.log(place);
                this.location = {
                  lat:place.geometry.location.lat(),
                  lng:place.geometry.location.lng()
                }
                this.address = place.formatted_address;

                console.log(this.location);
                console.log(this.address);
            });
        });
}


  addItem(): void {
    if (!Meteor.userId()) {
      alert('Please log in to add a item');
      return;
    }

    if (this.addForm.valid) {
      
      let item = {
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
      }

      Meteor.call('insertItem', item).subscribe(()=>{
        this.addForm.reset();
      })

      // Items.insert(item).subscribe(()=>{
      //   this.addForm.reset();
      // })
    }
  }

  onImage(imageId: string) {
    this.images.push(imageId);
  }

  resetImages(){
    this.images = [];
  }

}
