import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AdminGuard} from '../services/admin.guard.service';

import {AdminComponent} from './admin.component';
import {AdminIndexComponent} from './pages/index';
import {AdminUsersComponent} from './pages/users/users';
import {AdminEditUserComponent} from './pages/users/edit/edit';
import {AdminCreateUserComponent} from './pages/users/create/create';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
