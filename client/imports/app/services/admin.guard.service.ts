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
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(public globals: Globals, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    let url: string = state.url;
    return this.checkAdmin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    console.log(this.checkAdmin(url));
    return this.checkAdmin(url);
  }

  checkAdmin(url: string): boolean {
    let result = this.globals.isAdmin();
    if(result == false){
      // this.router.navigateByUrl('/login');
    }
    return true;
  }
}
