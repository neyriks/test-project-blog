import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';

import { LoginPageComponent, DashboardPageComponent, CreatePageComponent, EditPageComponent } from './pages'


import { AuthService } from './shared/services/auth.services';
import { SharedModule } from '../shared/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {
            path: 'login', component: LoginPageComponent
          },
          {
            path: '', redirectTo: '/admin/login', pathMatch: 'full'
          },
          {
            path: 'dashboard', component: DashboardPageComponent
          },
          {
            path: 'create', component: CreatePageComponent
          },
          {
            path: 'post/:id/edit', component: EditPageComponent
          }
        ]
      }
    ]),
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent
  ],
  providers: [
    AuthService
  ]
})

export class AdminModule {

}