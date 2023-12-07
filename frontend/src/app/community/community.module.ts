import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumListComponent } from './forum-list/forum-list.component';
import { ForumThreadComponent } from './forum-thread/forum-thread.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotificationModule } from '../notification.module';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: 'forums', component: ForumListComponent },
  { path: 'forums/:id', component: ForumThreadComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: '', component: LandingPageComponent },
];

@NgModule({
  declarations: [
    ForumListComponent,
    ForumThreadComponent,
    PostDetailComponent,
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    NotificationModule,
  ],
  exports: [RouterModule],
})
export class CommunityModule {}
