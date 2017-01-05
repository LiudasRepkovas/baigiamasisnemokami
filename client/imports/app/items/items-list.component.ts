import { Component } from '@angular/core';
import {OnDestroy, OnInit} from "@angular/core";
import {Observable, Subscription, Subject} from "rxjs";
import {Item} from "../../../../both/models/item.model";
import {MeteorObservable} from "meteor-rxjs";
import {PaginationService} from "ng2-pagination";
import {Items} from "../../../../both/collections/items.collection";
import {Categories} from "../../../../both/collections/categories.collection";
import {Counts} from "meteor/tmeasday:publish-counts";
import {InjectUser} from "angular2-meteor-accounts-ui";
import {FormControl} from '@angular/forms';

import * as _ from 'lodash';
import 'rxjs/add/operator/combineLatest';
import template from './items-list.component.html';
import style from './items-list.component.scss';

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
  categoryInput = new FormControl();
  orderInput = new FormControl();

  pageSize: Subject<number> = new Subject<number>();
  curPage: Subject<number> = new Subject<number>();
  order: Subject<number> = new Subject<number>();
  searchQuery: Subject<string> = new Subject<string>();
  category: Subject<string> = new Subject<string>();


  imagesSubs: Subscription;

  constructor(private paginationService: PaginationService) {
  }

  ngOnInit() {
    // Meteor.call('getCategories', (error, result)=>{
    //   this.categories = result;
    //   this.loading = false;
    // });
    
    


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
    ).subscribe(([pageSize, curPage, order, searchQuery, category]) => {
      var options: Options = {
        limit: pageSize as number,
        skip: (curPage as number - 1) * (pageSize as number),
        sort: {timestamp: order as number}
      };

      // console.log("options");
      // console.log(options);

      let query = {};
      if(searchQuery as string != ''){
        query['name'] = {$regex: searchQuery as string, $options: "i"};
      }
        
      if(category as string != ''){
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
              {
                transform:(item)=>{
                let category = _.filter(this.categories, {_id:item.category})[0];
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
    this.loading = false;

    this.searchInput.valueChanges
          .debounceTime(1000)
          .distinctUntilChanged()
          .subscribe(value => this.searchQuery.next(value));

    this.categoryInput.valueChanges.subscribe(data => {
      this.category.next(data);
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

  log(stuff){
    console.log(stuff);
  }
}