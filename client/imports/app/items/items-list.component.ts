import { Component, ElementRef, ViewChildren, QueryList, ChangeDetectorRef  } from '@angular/core';
import {OnDestroy, OnInit} from "@angular/core";
import {Observable, Subscription, Subject} from "rxjs";
import {Item} from "../../../../both/models/item.model";
import {PaginationService} from "ng2-pagination";
import {Items} from "../../../../both/collections/items.collection";
import {Categories} from "../../../../both/collections/categories.collection";
import {Counts} from "meteor/tmeasday:publish-counts";
import {MeteorObservable} from "meteor-rxjs";
import {InjectUser} from "angular2-meteor-accounts-ui";
import {FormControl} from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core';


import * as _ from 'lodash';
import 'rxjs/add/operator/combineLatest';
import template from './items-list.component.html';
import style from './items-list.component.scss';

declare var google:any;

interface Pagination {
  limit: number;
  skip: number;
}

interface Options extends Pagination {
  [key: string]: any
}


@Component({
  selector: 'items-list',
  template: template,
  styles: [ style ]
})
@InjectUser('user')


export class ItemsListComponent implements OnInit, OnDestroy {

  @ViewChildren('autocomplete') autocompleteInput : QueryList<ElementRef>;
  

  items: any;
  itemsSub: Subscription;
  locations: any;
  itemsSize: number = 0;
  autorunSub: Subscription;
  user: Meteor.User;
  optionsSub :Subscription;
  categoriesSub: any;
  categories: any;
  loading: boolean = true;

  searchInput = new FormControl();
  categoryInput = new FormControl('');
  orderInput = new FormControl(-1);
  imagesInput = new FormControl(false);
  cityInput = new FormControl('');



  pageSize: Subject<number> = new Subject<number>();
  curPage: Subject<number> = new Subject<number>();
  order: Subject<number> = new Subject<number>();
  searchQuery: Subject<string> = new Subject<string>();
  category: Subject<string> = new Subject<string>();
  address: Subject<string> = new Subject<string>();
  searchRadius: Subject<number> = new Subject<number>();
  images: Subject<boolean> = new Subject<boolean>();

  location: Subject<any> = new Subject<any>();;
  


  imagesSubs: Subscription;

  constructor(private paginationService: PaginationService, private _loader: MapsAPILoader, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    // Meteor.call('getCategories', (error, result)=>{
    //   this.categories = result;
    //   this.loading = false;
    // });

    //TODO:padaryt kad lauktu kol suras useri bl
    //TODO:sutvarkyt kad gautu userio lokacija

    let interval = setInterval(()=>{
      if(this.autocompleteInput.toArray() && this.autocompleteInput.toArray()[0] && this.autocompleteInput.toArray()[0].nativeElement){
        console.log(this.autocompleteInput);
        console.log('atsirado');
        clearInterval(interval);
        this.autocomplete();
      }
    }, 100)
    
    


    this.categoriesSub = MeteorObservable.subscribe('categories').subscribe(()=>{
      this.categories = Categories.find({}).fetch();
    });

    this.imagesSubs = MeteorObservable.subscribe('images').subscribe();
    this.optionsSub = Observable.combineLatest(
      this.pageSize,
      this.curPage,
      this.order,
      this.searchQuery,
      this.category,
      this.location,
      this.searchRadius,
      this.images
    ).subscribe(([pageSize, curPage, order, searchQuery, category, location, radius, images]) => {
      var options: Options = {
        limit: pageSize as number,
        skip: (curPage as number - 1) * (pageSize as number),
        sort: {timestamp: order as number}
      };


      // console.log("options");
      // console.log(options);

      let query = {
        active: true,
        deleted: {$ne: true}
      };

      
      // Items.find({location:{$near:[54.6730103, 25.2737462], $maxDistance: 10 / 111.12 }}).fetch()
      if(location){
        query['location'] = {
          $near:{
            $geometry: {
              type: 'Point',
              coordinates: [ location.lng, location.lat ]
            },
            $maxDistance: radius *  1000
          }
        }
    }

      if(searchQuery as string != ''){
        query['$or'] = [
          {name:{$regex: searchQuery as string, $options: "i"}},
          {description: {$regex: searchQuery as string, $options: "i"}}
        ];
      }

      if(images){
        query['images'] = { $exists: true, $not: {$size: 0} };
      }
        
      if(category && category as string != ''){
        query['category'] = category as string;
      }

      this.paginationService.setCurrentPage(this.paginationService.defaultId, curPage);

      if(this.itemsSub){
        this.itemsSub.unsubscribe();
      }

      console.log(options);

      this.itemsSub = MeteorObservable.subscribe('items', query, options).subscribe(()=>{
            let items = Items.find(
              query, 
              { sort:{timestamp:order as number},
                transform:(item)=>{
                let category: any = _.filter(this.categories, {_id:item.category})[0];
                if(!category){
                  category = {name:"Be kategorijos"};
                }
                item.category = category;
                return item;
                }
              });
            console.log("filtered itemsZZZ");
            console.log(items.fetch());
            this.items = items;
      });
      this.ref.markForCheck()
      this.ref.detectChanges()

    });

    this.paginationService.register({
      id: this.paginationService.defaultId,
      itemsPerPage: 9,
      currentPage: 1,
      totalItems: this.itemsSize
    });

    this.pageSize.next(9);
    this.curPage.next(1);
    this.order.next(-1);
    this.category.next('');
    this.searchQuery.next('');
    this.location.next(null);    
    this.address.next(null);
    this.searchRadius.next(30)
    this.images.next(false);
    this.loading = false;

    this.searchInput.valueChanges
          .debounceTime(1000)
          .distinctUntilChanged()
          .subscribe(value => this.searchQuery.next(value));

    this.categoryInput.valueChanges.subscribe(data => {
      this.category.next(data);
    })

    this.imagesInput.valueChanges.subscribe(data => {
      this.images.next(data)

    })
    
    this.orderInput.valueChanges.subscribe(data => {
      this.order.next(parseInt(data));
    })

    this.autorunSub = MeteorObservable.autorun().subscribe(() => {
      this.itemsSize = Counts.get('numberOfItems');
      this.paginationService.setTotalItems(this.paginationService.defaultId, this.itemsSize);
      this.locations = Meteor.call('getItemLocations', (error, result)=>{
        this.locations = result;
      });
    });
  }


  onPageChanged(page: number): void {
    this.curPage.next(page);
  }

  onOrderChanged(order: any): void {
    this.order.next(parseInt(order));
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
    this.optionsSub.unsubscribe();
    this.autorunSub.unsubscribe();
    this.imagesSubs.unsubscribe();
  }

  sliderChanged(event){
    this.searchRadius.next(event.value);
  }

  autocomplete() {
    this._loader.load().then(() => {
        console.log(this.autocompleteInput.toArray());
        let autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.toArray()[0].nativeElement , {});
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            let place = autocomplete.getPlace();
            if(place.geometry){
              this.location.next({
                lat:place.geometry.location.lat(),
                lng:place.geometry.location.lng()
              })
            } else {
              this.location.next(null);
            }
            this.cityInput.setValue(place.formatted_address);
            console.log(place);

        });
    });
}

cityInputChange(value){
  if(!value || value == ''){
    this.location.next(null);
  }
}

  log(stuff){
    console.log(stuff);
  }
}