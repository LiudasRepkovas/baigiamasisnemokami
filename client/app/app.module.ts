import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination';
import { provideLazyMapsAPILoaderConfig } from 'angular2-google-maps/core';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from "./app.component";
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
// import {RecoverComponent} from './components/resetPass/recover.component';
import { routes } from './routes';
// import { ITEMS_DECLARATIONS } from './items';
// import { COMMENTS_DECLARATIONS } from './comments';
// import { NOTIFICATIONS_DECLARATIONS } from './notifications';
// import { USER_DECLARATIONS } from './user';
// import { AUTH_DECLARATIONS } from './auth';
// import { MESSAGES_DECLARATIONS } from './messages';
import {MatInputModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material';
import {MatListModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material';


// import { SHARED_DECLARATIONS} from "./shared";
// import { FileDropModule } from "angular2-file-drop";
// import { GooglePlaceModule } from './downloaded/ng2-autocomplete/ng2-google-place.module';
// import { TimeAgoPipe } from './pipes/timeAgo.pipe';
// import { KeysPipe } from './pipes/keys.pipe';
// import { TruncatePipe } from './pipes/truncate.pipe';
// import { Autosize } from './downloaded/autosize/autosize';  
// import {KSSwiperModule} from 'angular2-swiper';
// import { Ng2CloudinaryModule } from 'ng2-cloudinary';
// import {AdminModule} from './admin/admin.module'



let moduleDefinition;
  moduleDefinition = {
    imports: [
      //AdminModule,
      //KSSwiperModule,
      //GooglePlaceModule,
      BrowserAnimationsModule,
      Ng2PaginationModule,
      BrowserModule,
      RouterModule.forRoot(routes),
      FormsModule,
      ReactiveFormsModule,
      //FileDropModule,

      //material modules
      MatInputModule,
      MatToolbarModule,
      MatListModule,
      MatButtonModule,
      MatSnackBarModule,

      

      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBtTHC2jP9DhLSXmeOuY13O-L27lk4Dvrc',
        libraries: ['places']
      }),
    ],
    declarations: [
      AppComponent,
      LoginComponent,
      SignupComponent,
      // RecoverComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
  }

@NgModule(moduleDefinition)
export class AppModule {}