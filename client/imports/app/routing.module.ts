import { Routes, RouterModule } from '@angular/router';
import { Meteor } from 'meteor/meteor';
import { NgModule } from '@angular/core';


import { ItemsListComponent } from './items/items-list.component';
import { ItemDetailsComponent } from './items/item-details.component';
import { ItemFormComponent } from './items/item-form.component';
import { RecoverComponent } from './auth/recover.component';
import { SignupComponent } from './auth/signup.component';
import { UserProfileComponent } from './user/profile.component';
import { LoginComponent } from './auth/login.component.web';
import { ChatListComponent } from './messages/chat-list.component';
import { ChatComponent } from './messages/chat.component';
import { NotificationsComponent } from './notifications/notifications.component';


export let routes: Routes = [
  { path: 'signup', component: SignupComponent },  
  { path: 'register', component: SignupComponent },  
  { path: '', component: ItemsListComponent },
  { path: 'item/id/:itemId', component: ItemDetailsComponent },
  { path: 'item/edit/:itemId', component: ItemFormComponent },
  { path: 'item/new', component: ItemFormComponent },
  { path: 'user/:userId', component: UserProfileComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'login', component: LoginComponent } ,
  { path: 'messages', component: ChatListComponent } ,
  { path: 'notifications', component: NotificationsComponent } ,
  { path: 'messages/:userId', component: ChatComponent } ,
  { path:'**', redirectTo: ''}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
