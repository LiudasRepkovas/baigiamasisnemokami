import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Route
} from '@angular/router';
import {Globals} from './global.service';

@Injectable()
export class AdminGuard implements CanActivate{
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    // let result = !!Meteor.userId();
    // let isAdmin = false;
    // if(!result){
    //     this.router.navigate(['/']);
    // } else {
    //   isAdmin = Meteor.user().profile.admin;
    // }
    // return isAdmin;
  }
}
