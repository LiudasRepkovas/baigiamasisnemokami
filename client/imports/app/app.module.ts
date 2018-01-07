import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination';
import { provideLazyMapsAPILoaderConfig } from 'angular2-google-maps/core';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { FileUploadModule } from 'ng2-file-upload';



import { AppComponent } from "./app.component.web";
import { AppRoutingModule } from './routing.module';
import { ITEMS_DECLARATIONS } from './items';
import { COMMENTS_DECLARATIONS } from './comments';
import { NOTIFICATIONS_DECLARATIONS } from './notifications';
import { USER_DECLARATIONS } from './user';
import { AUTH_DECLARATIONS } from './auth';
import { MESSAGES_DECLARATIONS } from './messages';
import { MatSnackBarModule, MatInputModule, MatSliderModule, MatSelectModule, MatNativeDateModule, MatDatepickerModule, MatCardModule, MatToolbarModule, MatButtonModule, MatChipsModule, MatMenuModule, MatListModule, MatIconModule,MatCheckboxModule, MatButtonToggleModule, MatDatepicker } from "@angular/material";
import { SHARED_DECLARATIONS} from "./shared";
import { FileDropModule } from "angular2-file-drop";
import { GooglePlaceModule } from './downloaded/ng2-autocomplete/ng2-google-place.module';
import { TimeAgoPipe } from './pipes/timeAgo.pipe';
import {UserNamePipe} from './pipes/userName.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { Autosize } from './downloaded/autosize/autosize';  
import { FacebookModule, FacebookService } from 'ngx-facebook';
import {KSSwiperModule} from 'angular2-swiper';
// import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import {AdminModule} from './admin/admin.module'

import {MatGridListModule} from '@angular/material/grid-list';




let moduleDefinition;
  moduleDefinition = {
    imports: [
      AdminModule,
      // Ng2CloudinaryModule,
      KSSwiperModule,
      GooglePlaceModule,
      Ng2PaginationModule,
      BrowserModule,
      AppRoutingModule,
      //material
      MatSnackBarModule,
      MatInputModule,
      MatCardModule,
      MatToolbarModule,
      MatButtonModule,
      MatChipsModule,
      MatMenuModule,
      MatSelectModule,
      MatGridListModule,
      MatListModule, 
      MatIconModule,
      MatButtonToggleModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSliderModule,

      FacebookModule.forRoot(),

      BrowserAnimationsModule,

      FileUploadModule,

      FormsModule,
      ReactiveFormsModule,
      FileDropModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBtTHC2jP9DhLSXmeOuY13O-L27lk4Dvrc',
        libraries: ['places']
      }),
    ],
    declarations: [
      AppComponent,
      ...NOTIFICATIONS_DECLARATIONS,
      ...AUTH_DECLARATIONS,
      ...ITEMS_DECLARATIONS,
      ...COMMENTS_DECLARATIONS,
      ...SHARED_DECLARATIONS,
      ...USER_DECLARATIONS,
      ...MESSAGES_DECLARATIONS,
      TimeAgoPipe,
      TruncatePipe,
      KeysPipe,
      Autosize,
      UserNamePipe
    ],
    providers: [FacebookService],
    bootstrap: [AppComponent]
  }

@NgModule(moduleDefinition)
export class AppModule {}