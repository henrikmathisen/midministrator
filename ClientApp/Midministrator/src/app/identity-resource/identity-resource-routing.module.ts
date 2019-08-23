import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentityResourceListComponent } from './identity-resource-list/identity-resource-list.component';
import { IdentityResourceDetailComponent } from './identity-resource-detail/identity-resource-detail.component';


const routes: Routes = [
  { 
    path: '' ,
    component: IdentityResourceListComponent 
  },
  {
    path: ':id',
    component: IdentityResourceDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityResourceRoutingModule { }
