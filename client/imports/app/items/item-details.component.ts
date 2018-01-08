import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ApplicationRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

import 'rxjs/operator/zip';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";
import {Router} from '@angular/router';
import {Counts} from 'meteor/tmeasday:publish-counts';



import * as _ from 'lodash';

import 'rxjs/add/operator/map';

import { Items } from '../../../../both/collections/items.collection';
import { Images } from '../../../../both/collections/images.collection';
import { Item } from '../../../../both/models/item.model';
import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';
import { Categories } from '../../../../both/collections/categories.collection';
import {MatSnackBar} from '@angular/material';

import template from './item-details.component.html';
import style from './item-details.component.scss';
import { Reservations } from '../../../../both/collections/reservations.collection';
import { setInterval } from 'timers';
import { Subject } from 'rxjs/Subject';



@Component({
  selector: 'item-details',
  template,
  styles: [ style ]

})
@InjectUser('user')
export class ItemDetailsComponent implements OnInit, OnDestroy {

  itemId: string;
  paramsSub: Subscription;
  item: Item;
  itemSub: any;
  users: Observable<User>;
  user: Meteor.User;
  imagesSubs: any;
  images: any = [];
  selectedImage:any;
  categories:any;
  categoriesSub:any;
  owner:any;
  ownerSub: any;
  userId: any;
  reservationSub: any;
  reservationsCount: any = new Subject<number>();
  reservations: any;
  reserved: any;
  reservationsCountSub: any;
  numberInRow: any;
  usersSub: any;
  zip: any;
  

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar,
    private ref: ApplicationRef
  ) {}

  ngOnInit() {

    this.userId = Meteor.userId();
    this.categoriesSub = MeteorObservable.subscribe('categories').subscribe(()=>{
      this.categories = Categories.find({}).fetch();
    });
  
    this.paramsSub = this.route.params
      .map(params => params['itemId'])
      .subscribe(itemId => {
        this.itemId = itemId;
        
        if (this.itemSub) {
          this.itemSub.unsubscribe();
        }

        this.reservationSub = MeteorObservable.subscribe('reservations', this.itemId);
        this.itemSub = MeteorObservable.subscribe('item', this.itemId);
        this.usersSub = MeteorObservable.subscribe('users');
        this.zip = Observable.zip(
          this.reservationSub,
          MeteorObservable.subscribe('item_reservations_count', this.itemId),
          this.usersSub,
          this.itemSub
          
        ).subscribe(()=>{

          if(this.userId){


              this.reserved = Reservations.find({owner: this.userId, item: this.itemId, active: true}).map((items)=>{
                return !!items.length;
              })

              this.reservations = Reservations.find({item: this.itemId, active: true}).map((reservations)=>{
                return reservations.map((value, index)=>{ 
                  let user = Meteor.users.findOne({_id: value.owner});
                  if(user && user.profile ){
                    value['name'] = user.profile.name;
                  }
                  return value;                  
                })
              });   

              this.numberInRow = Reservations.find({item: this.itemId, active: true}, {sort:{timestamp: 1}}).map((items)=>{
                console.log('itemai', items);
                return _.findIndex(items, {owner: this.userId});
              })
              MeteorObservable.autorun().subscribe(() => {
                this.reservationsCount = Counts.get('item_reservations')
              })              
              
              // this.reservationsCount = Counts.get('item_reservations');  
              
              // setInterval(()=>{
                // this.reservationsCount = MeteorObservable.call('getReservationsCount', this.itemId).subscribe(result =>{
                //   console.log(result);
                //   this.reservationsCount.next(result);
                // });
              // this.reservationsCount = Reservations.find({item: this.itemId, active: true}, {sort:{timestamp: -1}}).map((items)=>{
              //   console.log('rezervacijos', items);
              //   return items.length;
              // })
              // }, 500);
            }

            this.item = Items.findOne({_id:this.itemId},{  
              transform:(item)=>{
                let category = _.filter(this.categories, {_id:item.category})[0];
                if(!category){
                  category = {name:"Be kategorijos"};
                }
                item.category = category;
                return item;
              }
            });

            this.owner = Meteor.users.findOne({_id: this.item.owner});
            

            if(this.item.images && this.item.images.length > 0){
              this.imagesSubs = MeteorObservable.subscribe('item_images', this.item.images).subscribe(()=>{
                for(let image of this.item.images){
                  console.log(Images.findOne({_id:image}))
                  this.images.push(Images.findOne({_id:image}))
                }
                this.selectedImage = this.images[0];
              });
            }


          });
        });
  }

  setPreview(image){
    this.selectedImage = image;
  }



  ngOnDestroy() {
    if(this.paramsSub){
      this.paramsSub.unsubscribe();
    }
    this.zip.unsubscribe();
    if(this.imagesSubs){
      this.imagesSubs.unsubscribe();
    }
  }

  reserveItem(){
    MeteorObservable.call('toggleReservation', this.itemId).toPromise().then(()=>{
      this.ref.tick();
    });
  }

  deleteItem(){
    if(confirm("Ar tikrai norite ištrinti?")){
      Meteor.call('removeItem', this.itemId, (error, response)=>{
        this.openSnackBar('Skelbimas sėkmingai ištrintas');
      });
      this.router.navigate(['/']);
    };
  }

    openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
    }
}