import 'angular2-meteor-polyfills';
import 'zone.js';
import 'reflect-metadata';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

Meteor.startup(() => {

  const platform = platformBrowserDynamic();
  platform.bootstrapModule(AppModule);
});