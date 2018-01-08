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
import { CategoriesComponent } from './adminstuff/categories';
import { UserListComponent } from './adminstuff/users';



import {LoggedInGuard} from './services/loggedIn.guard.service';
import {AdminGuard} from './services/admin.guard.service';


export let routes: Routes = [
  { path: 'signup', component: SignupComponent },  
  { path: 'register', component: SignupComponent },  
  { path: '', component: ItemsListComponent },
  { path: 'item/id/:itemId', component: ItemDetailsComponent },
  { path: 'item/edit/:itemId', component: ItemFormComponent, canActivate: [LoggedInGuard] },
  { path: 'item/new', component: ItemFormComponent, canActivate: [LoggedInGuard]},
  { path: 'user/:userId', component: UserProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'recover', component: RecoverComponent },
  { path: 'login', component: LoginComponent } ,
  { path: 'messages', component: ChatListComponent, canActivate: [LoggedInGuard] } ,
  { path: 'notifications', component: NotificationsComponent, canActivate: [LoggedInGuard] } ,
  { path: 'messages/:userId', component: ChatComponent, canActivate: [LoggedInGuard] } ,
  { path: 'admin/categories', component: CategoriesComponent } ,  
  { path: 'admin/users', component: UserListComponent } ,  
  { path:'**', redirectTo: ''}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [LoggedInGuard]
})
export class AppRoutingModule {}
