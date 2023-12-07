import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NotifierModule } from 'angular-notifier';
import { RouterModule, Routes } from '@angular/router';
import { NotificationService } from './user/services/notification.service';
import { AuthInterceptor } from './user/interceptor/auth.interceptor';
import { AuthenticationService } from './user/services/authentication.service';
import { UserService } from './user/services/user.service';
import { PermissionsService } from './user/services/permissions.service';
import { FormsModule } from '@angular/forms';
import { NotificationModule } from './notification.module';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'community',
    pathMatch: 'full',
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'community',
    loadChildren: () =>
      import('./community/community.module').then((m) => m.CommunityModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    NotificationService,
    PermissionsService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
