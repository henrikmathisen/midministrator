import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiResourceListComponent } from './api-resource-list/api-resource-list.component';
import { ApiResourceDetailComponent } from './api-resource-detail/api-resource-detail.component';


const routes: Routes = [
  { 
    path: '' ,
    component: ApiResourceListComponent 
  },
  {
    path: ':id',
    component: ApiResourceDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiResourceRoutingModule { }
