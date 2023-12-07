import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationModule } from '../notification.module';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, DashboardComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    FormsModule,
    NotificationModule,
  ],
  exports: [RouterModule],
})
export class UserModule {}
