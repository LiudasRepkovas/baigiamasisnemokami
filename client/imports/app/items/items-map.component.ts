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


    constructor(private _loader: MapsAPILoader) {
        //TODO:padaryt kad lauktu kol suras useri bl
        //TODO:sutvarkyt kad gautu userio lokacija
    }

    ngOnInit(){
    }
}
