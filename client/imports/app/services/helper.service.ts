import { Injectable } from '@angular/core';
import {Categories} from "../../../../both/collections/categories.collection";
import {MeteorObservable} from "meteor-rxjs";


@Injectable()
export class HelperService {
    
    getCategoryName(cat_id){
        Meteor.call('getCategoryName', cat_id, (error, result)=>{
            console.log("result");
            console.log(result.name);
            return result.name;
        });
    }
}
