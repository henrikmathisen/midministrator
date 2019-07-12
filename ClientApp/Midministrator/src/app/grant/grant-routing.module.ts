import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrantListComponent } from './grant-list/grant-list.component';

const routes: Routes = [
  { 
    path: '' ,
    component: GrantListComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrantRoutingModule { }
