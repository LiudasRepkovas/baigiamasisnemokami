import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin.routing.module';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

import {AdminComponent} from './admin.component';
import {AdminIndexComponent} from './pages/index';
import {AdminUsersComponent} from './pages/users/users';

import {AdminEditUserComponent} from './pages/users/edit/edit';
import {AdminGuard} from '../services/admin.guard.service';
import {Globals} from '../services/global.service';

import {AdminCreateUserComponent} from './pages/users/create/create';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    Ng2BootstrapModule,
    Ng2DatetimePickerModule
  ],
  declarations: [
    AdminComponent,
    AdminIndexComponent,
    AdminUsersComponent,
    AdminEditUserComponent,
    AdminCreateUserComponent,
  ],
  providers: [AdminGuard, Globals]
})
export class AdminModule {}
