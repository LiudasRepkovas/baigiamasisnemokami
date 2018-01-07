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
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() : boolean {
    let result = !!Meteor.userId();
    if(!result){
        this.router.navigate(['/']);
    }
    return result;
  }
}
