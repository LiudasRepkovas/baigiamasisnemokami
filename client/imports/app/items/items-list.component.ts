import { Component } from '@angular/core';
import {OnDestroy, OnInit} from "@angular/core";
import {Observable, Subscription, Subject} from "rxjs";
import {Item} from "../../../../both/models/item.model";
import {MeteorObservable} from "meteor-rxjs";
import {PaginationService} from "ng2-pagination";
import {Items} from "../../../../both/collections/items.collection";
import {Counts} from "meteor/tmeasday:publish-counts";
import {InjectUser} from "angular2-meteor-accounts-ui";
import 'rxjs/add/operator/combineLatest';
import template from './items-list.component.html';

interface Pagination {
  limit: number;
  skip: number;
}

interface Options extends Pagination {
  [key: string]: any
}


@Component({
  selector: 'items-list-aaaaa',
  template,
})
@InjectUser('user')


export class ItemsListComponent implements OnInit, OnDestroy {

  items: Observable<Item[]>;
  itemsSub: Subscription;
  itemsSize: number = 0;
  autorunSub: Subscription;
  user: Meteor.User;
  optionsSub :Subscription;

  pageSize: Subject<number> = new Subject<number>();
  curPage: Subject<number> = new Subject<number>();
  order: Subject<number> = new Subject<number>();
  searchQuery: Subject<string> = new Subject<string>();
  category: Subject<string> = new Subject<string>();

  imagesSubs: Subscription;

  constructor(private paginationService: PaginationService) {
  }

  ngOnInit() {

    this.imagesSubs = MeteorObservable.subscribe('images').subscribe();
    this.optionsSub = Observable.combineLatest(
      this.pageSize,
      this.curPage,
      this.order,
      this.searchQuery,
      this.category,
    ).subscribe(([pageSize, curPage, order, searchQuery, category]) => {
      console.log("order as number");
      console.log(order as number);
      var options: Options = {
        limit: pageSize as number,
        skip: (curPage as number - 1) * (pageSize as number),
        sort: {timestamp: order as number}
      };

      console.log("options");
      console.log(options);

      let query = {};
      
     this.paginationService.setCurrentPage(this.paginationService.defaultId, curPage);

      if(this.itemsSub){
            this.itemsSub.unsubscribe();
      }

      this.itemsSub = MeteorObservable.subscribe('items', options).subscribe(()=>{
           this.items = Items.find({}).zone();
      });

    });
    

   
    this.paginationService.register({
      id: this.paginationService.defaultId,
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.itemsSize
    });

    this.pageSize.next(10);
    this.curPage.next(1);
    this.order.next(-1);
    this.category.next('');
    this.searchQuery.next('');

    this.autorunSub = MeteorObservable.autorun().subscribe(() => {
      this.itemsSize = Counts.get('numberOfItems');
      this.paginationService.setTotalItems(this.paginationService.defaultId, this.itemsSize);
    });

  }


  onPageChanged(page: number): void {
    this.curPage.next(page);
  }

  onOrderChanged(order: any): void {
    this.order.next(parseInt(order));
  }

  onCategoryChanged(category: string): void {
    this.category.next(category);
  }

  onSearchQueryChanged(query: string): void {
    this.searchQuery.next(query);
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
    this.optionsSub.unsubscribe();
    this.autorunSub.unsubscribe();
    this.imagesSubs.unsubscribe();
  }
}