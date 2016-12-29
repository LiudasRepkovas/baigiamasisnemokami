import { Component, OnInit} from '@angular/core';
import { Items } from '../../../../both/collections/items.collection';
import { InjectUser } from "angular2-meteor-accounts-ui";
import * as _ from "lodash";
import { MapsAPILoader } from 'angular2-google-maps/core';
import {Subject, Subscription, Observable} from "rxjs";
import {MeteorObservable} from "meteor-rxjs";
import {Categories} from "../../../../both/collections/categories.collection";

import template from './items-map.component.html';
import style from './items-map.component.scss';


declare var google:any;

@Component({
    selector: 'items-map',
    template,
    styles: [ style ]
})
@InjectUser("user")
export class ItemsMapComponent{

    location: any = {lat: 54.687157, lng: 25.279652};
    loading: boolean;
    itemsSub:any;
    items: any;
    categories: any;
    categoriesSub:any; 

    constructor(private _loader: MapsAPILoader) {
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
    }

    ngOnInit(){

        this.itemsSub = MeteorObservable.subscribe('items', {}, {}).subscribe(()=>{
            let items = Items.find({}).fetch();
            var itemsWithCategories = [];

            _.each(items, (item)=>{
                let category = _.filter(this.categories, {_id:item.category})[0];
                if(!category){
                    category = {name:"Be kategorijos"};
                }
                item.category = category;
                itemsWithCategories.push(item);
            })
            this.items = itemsWithCategories;
        });
    }
}
