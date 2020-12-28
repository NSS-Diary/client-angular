import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CAdminListComponent } from './pages/cadmin-list/cadmin-list.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    children: [
      {
        path: 'users/list',
        component: CAdminListComponent,
        data: { roles: ['SUPER_ADMIN'] },
      },
      {
        path: '',
        component: DashboardComponent,
        data: { roles: ['SUPER_ADMIN', 'CLASSROOM_ADMIN', 'STUDENT'] },
      },
    ],
  },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
