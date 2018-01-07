import { Component, OnInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Items } from '../../../../both/collections/items.collection';
import { InjectUser } from "angular2-meteor-accounts-ui";
import { ActivatedRoute } from '@angular/router';
import * as _ from "lodash";
import * as moment from "moment";
import { MapsAPILoader } from 'angular2-google-maps/core';
import {Subject, Subscription, Observable} from "rxjs";
import {MeteorObservable} from "meteor-rxjs";
import {Categories} from "../../../../both/collections/categories.collection";
import {Images} from "../../../../both/collections/images.collection";
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

import template from './item-form.component.html';
import style from './item-form.component.scss';

declare var google:any;

@Component({
  selector: 'item-form',
  template,
  styles: [ style ]
})
@InjectUser("user")
export class ItemFormComponent implements OnInit, OnDestroy {
  
  @ViewChildren('autocomplete') autocompleteInput : QueryList<ElementRef>;
  addForm: FormGroup;
  images: any[] = [];
  location: any ;
  address: any = "Vilnius, Lithuania";
  categories: any;
  loading: boolean = true;
  categoriesSub:any;
  paramsSub:any;
  itemId:any;
  item:any;
  itemSub:any;
  imagesSubs:any;
  allImages: any;
  minDate: any = moment().toISOString();

  constructor( public router: Router, private formBuilder: FormBuilder,  private _loader: MapsAPILoader, private route: ActivatedRoute, private snackBar:MatSnackBar) {

    
    console.log(this.location);

   
   
  }

  ngOnInit(){

    this.location = {lat: 54.687157, lng: 25.279652};
    //TODO:padaryt kad lauktu kol suras useri bl
    //TODO:sutvarkyt kad gautu userio lokacija

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
            this.location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
        });
    } 


    let newInterval = setInterval(()=>{
      
      if(this.user){
        this.loading = false;        
        clearInterval(newInterval);
      }
    }, 100)
    


    let interval = setInterval(()=>{

      if(this.autocompleteInput.toArray() && this.autocompleteInput.toArray()[0] && this.autocompleteInput.toArray()[0].nativeElement){
        console.log(this.autocompleteInput);
        console.log('atsirado');
        clearInterval(interval);
        this.autocomplete();
      }
    }, 100)

    this.imagesSubs = MeteorObservable.subscribe('images').subscribe();


    this.paramsSub = this.route.params.map(params => params['itemId']).subscribe(itemId => {
      this.itemId = itemId;
      this.categoriesSub = MeteorObservable.subscribe('categories').subscribe(()=>{
        this.categories = Categories.find({});
        if(this.itemId){
          this.itemSub = MeteorObservable.subscribe('item', this.itemId).subscribe(() => {
            this.item = Items.findOne({_id:this.itemId});
            this.images = this.item.images;
            this.addForm.controls['name'].setValue(this.item.name);
            this.addForm.controls['description'].setValue(this.item.description);
            this.addForm.controls['location'].setValue(this.item.address);
            this.addForm.controls['reservable'].setValue(this.item.reservable);          
            this.addForm.controls['expires_at'].setValue(moment(this.item.expires_at).toISOString());                        
            this.addForm.controls['category'].setValue(this.item.category);
            this.addForm.markAsDirty();
            this.addForm.markAsTouched();
          });
        }    
      });
      
  });

    this.categoriesSub = MeteorObservable.subscribe('categories').subscribe(()=>{
      this.categories = Categories.find({});
    });

    
    
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required],
      reservable: [false],
      expires_at: [moment().add(1,'months').toISOString()]
    });
  }

  getImageUrl(id){
    return Images.find({_id:id}).fetch()[0].url;
  }

  autocomplete() {
        this._loader.load().then(() => {
            console.log(this.autocompleteInput.toArray());
            let autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.toArray()[0].nativeElement , {});
            google.maps.event.addListener(autocomplete, 'place_changed', () => {
                let place = autocomplete.getPlace();
                console.log(place);
                this.location = [
                  place.geometry.location.lng(),
                  place.geometry.location.lat()
                ]
                this.address = place.formatted_address;
                console.log(place);

                console.log(this.location);
                console.log(this.address);
            });
        });
  }


  addItem(): void {
    if (!Meteor.userId()) {
      alert('Norėdami sukurti skelbimą privalote prisijungti!');
      return;
    }

    if (this.addForm.valid) {
      
      let item = {
        name: this.addForm.value.name,
        description: this.addForm.value.description,
        category: this.addForm.value.category,
        images: this.images,
        expires_at: +moment(this.addForm.value.expires_at).format('x'),
        reservable: this.addForm.value.reservable,
        owner: Meteor.userId(),
        active: true,
        deleted: false,
        timestamp: null,
        // expires: _.now(),
        location: this.location,
        address: this.address
      }

      if(this.itemId){
        item['_id'] = this.itemId;
      }

      if(this.item){
        Meteor.call('updateItem', item, (error, response)=>{
          if(!error){
            this.openSnackBar("Skelbimas sekmingai išsaugotas");
            this.router.navigate(['/item/id/'+this.itemId]);
          }
        });
      } else {
        Meteor.call('insertItem', item, (error, response)=>{
          console.log(error, response);
          if(!error){
            this.openSnackBar("Skelbimas sekmingai išsaugotas");
            this.addForm.reset();
            this.router.navigate(['/']);
          } else {
            this.openSnackBar('Klaida!' + error.reason);
            console.log(error);
          }
        });
      }      
    } else {
      this.openSnackBar("Užpildykite visus formos laukus!");
    }
  }

  onImage(imageId: string) {
    setTimeout(this.images.push(imageId), 10);
  }
  
  removeImage(index){
    if(this.images.length > 1){
      this.images.splice(index, 1);
    } else {
      this.images = [];
    }
    console.log(this.images);
  }

  resetImages(){
    if(!this.itemId){
      this.images = [];
    }
  }

  ngOnDestroy(){
    this.imagesSubs.unsubscribe();
  }

  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  imageLeft(i){
    let tmp = this.images[i-1];
    this.images[i - 1] = this.images[i];
    this.images[i] = tmp;
    
  }

  
  imageRight(i){
    let tmp = this.images[i+1];
    this.images[i + 1] = this.images[i];
    this.images[i] = tmp;
  }

}
