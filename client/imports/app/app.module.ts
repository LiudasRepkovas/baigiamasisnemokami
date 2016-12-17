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
import { AUTH_DECLARATIONS } from './auth';
import { MaterialModule } from "@angular/material";
import { SHARED_DECLARATIONS} from "./shared";
import { FileDropModule } from "angular2-file-drop";
import {GooglePlaceModule} from './downloaded/ng2-autocomplete/ng2-google-place.module';


let moduleDefinition;
  moduleDefinition = {
    imports: [
      GooglePlaceModule,
      Ng2PaginationModule,
      BrowserModule,
      RouterModule.forRoot(routes),
      MaterialModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      FileDropModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBtTHC2jP9DhLSXmeOuY13O-L27lk4Dvrc'
      }),
    ],
    declarations: [
      AppComponent,
      ...AUTH_DECLARATIONS,
      ...ITEMS_DECLARATIONS,
      ...COMMENTS_DECLARATIONS,
      ...SHARED_DECLARATIONS,
    ],
    providers: [
     
    ],
    bootstrap: [AppComponent]
  }

@NgModule(moduleDefinition)
export class AppModule {}