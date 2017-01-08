import {Component} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {MeteorComponent} from 'angular2-meteor';
import 'rxjs/add/operator/filter';

import template from './admin.component.html';
import style from './admin.component.scss';

@Component({
  template,
  styleUrls: [
    'css/AdminLTE.min.css',
    'css/skin-blue.min.css'
  ],
  styles: [style]
})
export class AdminComponent extends MeteorComponent {
  sidebarOpen: boolean = false;
  currentYear: number = new Date().getFullYear();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){
    super();

    this.autorun(() => {
      if(!Meteor.userId() && this.router.url != '/login'){
        this.router.navigateByUrl('/login');
      }
    });
  }
}
