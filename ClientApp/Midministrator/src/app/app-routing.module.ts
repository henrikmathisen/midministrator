import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', 
    loadChildren: () => import ('./client/client.module').then(mod => mod.ClientModule)
  },
  {
    path: 'applications',
      loadChildren: () => import('./application/application.module').then(mod => mod.ApplicationModule)
  },
  {
    path: 'roles',
    loadChildren: () => import('./role/role.module').then(mod => mod.RoleModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)
  },
  {
    path: 'groups',
    loadChildren: () => import('./group/group.module').then(mod => mod.GroupModule)
  },
  {
    path: 'grants',
    loadChildren: () => import('./grant/grant.module').then(mod => mod.GrantModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
