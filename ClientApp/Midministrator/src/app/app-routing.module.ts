import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerService } from './services/spinner.service';

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full', canLoad: [AuthGuardService], canActivate: [AuthGuardService] },
  { path: 'clients', 
    loadChildren: () => import ('./client/client.module').then(mod => mod.ClientModule)
  },
  {
    path: 'applications', canLoad: [AuthGuardService], canActivate: [AuthGuardService],
      loadChildren: () => import('./application/application.module').then(mod => mod.ApplicationModule)
  },
  {
    path: 'roles', canLoad: [AuthGuardService], canActivate: [AuthGuardService],
    loadChildren: () => import('./role/role.module').then(mod => mod.RoleModule)
  },
  {
    path: 'users', canLoad: [AuthGuardService], canActivate: [AuthGuardService],
    loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)
  },
  {
    path: 'groups', canLoad: [AuthGuardService], canActivate: [AuthGuardService],
    loadChildren: () => import('./group/group.module').then(mod => mod.GroupModule)
  },
  {
    path: 'grants', canLoad: [AuthGuardService], canActivate: [AuthGuardService],
    loadChildren: () => import('./grant/grant.module').then(mod => mod.GrantModule)
  },
  {
    path: 'apiresources', canLoad: [AuthGuardService], canActivate: [AuthGuardService],
    loadChildren: () => import('./api-resource/api-resource.module').then(mod => mod.ApiResourceModule)
  },
  {
    path: 'identityresources', canLoad: [AuthGuardService], canActivate: [AuthGuardService],
    loadChildren: () => import('./identity-resource/identity-resource.module').then(mod => mod.IdentityResourceModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
  providers: [ SpinnerService ]
})
export class AppRoutingModule { }
