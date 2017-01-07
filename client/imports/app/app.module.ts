import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination';
import { provideLazyMapsAPILoaderConfig } from 'angular2-google-maps/core';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from "./app.component.web";
import { routes } from './app.routes';
import { ITEMS_DECLARATIONS } from './items';
import { COMMENTS_DECLARATIONS } from './comments';
import { USER_DECLARATIONS } from './user';
import { AUTH_DECLARATIONS } from './auth';
import { MESSAGES_DECLARATIONS } from './messages';
import { MaterialModule } from "@angular/material";
import { SHARED_DECLARATIONS} from "./shared";
import { FileDropModule } from "angular2-file-drop";
import { GooglePlaceModule } from './downloaded/ng2-autocomplete/ng2-google-place.module';
import { TimeAgoPipe } from './pipes/timeAgo.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { TruncatePipe } from 'angular2-truncate';
import { Autosize } from './downloaded/autosize/autosize';  
import {KSSwiperModule} from 'angular2-swiper';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import {AdminModule} from './admin/admin.module'



let moduleDefinition;
  moduleDefinition = {
    imports: [
      AdminModule,
      Ng2CloudinaryModule,
      KSSwiperModule,
      GooglePlaceModule,
      Ng2PaginationModule,
      BrowserModule,
      RouterModule.forRoot(routes),
      MaterialModule.forRoot(),
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
    ],
    providers: [],
    bootstrap: [AppComponent]
  }

@NgModule(moduleDefinition)
export class AppModule {}