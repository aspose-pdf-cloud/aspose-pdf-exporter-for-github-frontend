import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { MainComponent } from './main/main.component';
import { CallbackComponent } from './callback/callback.component';
import { IssuesComponent } from './issues/issues.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'auth',
    component: CallbackComponent
  },
  {
    path: 'repositories',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: RepositoriesComponent
      },
      {
        path: ':id',
        component: IssuesComponent
      },
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
