import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoviesComponent } from './movies/movies.component';
import { UsersComponent } from './users/users.component';
import { CommentsComponent } from './comments/comments.component';
import { MessagesComponent } from './messages/messages.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardHeaderComponent,
      },
      {
        path: 'movies',
        component: MoviesComponent,
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'comments',
        component: CommentsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
