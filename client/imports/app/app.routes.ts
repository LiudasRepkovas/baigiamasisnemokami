import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { ItemsListComponent } from './items/items-list.component';
import { ItemDetailsComponent } from './items/item-details.component';
import { ItemFormComponent } from './items/item-form.component';
import { RecoverComponent } from './auth/recover.component';
import { SignupComponent } from './auth/signup.component';
import { LoginComponent } from './auth/login.component.web';


export const routes: Route[] = [
  { path: '', component: ItemsListComponent },
  { path: 'item/id/:itemId', component: ItemDetailsComponent },
  { path: 'item/edit/:itemId', component: ItemFormComponent },
  { path: 'item/new', component: ItemFormComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'login', component: LoginComponent } 
];
