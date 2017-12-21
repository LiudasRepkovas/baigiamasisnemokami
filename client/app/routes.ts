import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

// import { ItemsListComponent } from './items/items-list.component';
// import { ItemDetailsComponent } from './items/item-details.component';
// import { ItemFormComponent } from './items/item-form.component';
// import { RecoverComponent } from './components/resetPass/recover.component';
import { SignupComponent } from './components/signup/signup.component';
// import { UserProfileComponent } from './user/profile.component';
import { LoginComponent } from './components/login/login.component';
// import { ChatListComponent } from './messages/chat-list.component';
// import { ChatComponent } from './messages/chat.component';
// import { NotificationsComponent } from './notifications/notifications.component';


export const routes: Route[] = [
  // { path: '', component: ItemsListComponent },
  // { path: 'item/id/:itemId', component: ItemDetailsComponent },
  // { path: 'item/edit/:itemId', component: ItemFormComponent },
  // { path: 'item/new', component: ItemFormComponent },
  // { path: 'user/:userId', component: UserProfileComponent },
  { path: 'signup', component: SignupComponent },
  // { path: 'recover', component: RecoverComponent },
  { path: 'login', component: LoginComponent } ,
  // { path: 'messages', component: ChatListComponent } ,
  // { path: 'notifications', component: NotificationsComponent } ,
  // { path: 'messages/:userId', component: ChatComponent } ,
];
