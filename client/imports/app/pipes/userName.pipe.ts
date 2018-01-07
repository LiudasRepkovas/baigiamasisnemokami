import {Pipe, ChangeDetectorRef, PipeTransform, OnDestroy, NgZone} from '@angular/core';
import {Users} from '../../../../both/collections/users.collection';
import { MeteorObservable } from 'meteor-rxjs';

@Pipe({name: 'userName'})
export class UserNamePipe implements PipeTransform {
  transform(userId) : any {
   
  } 
} 