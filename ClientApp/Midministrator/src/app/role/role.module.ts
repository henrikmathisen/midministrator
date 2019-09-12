import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { RoleRoutingModule } from './role-routing.module';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleService } from '../services/role/role.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServerInterceptorService } from '../base/server-interceptor.service';
import { SpinnerService } from '../services/spinner.service';

@NgModule({
  declarations: [RoleListComponent, RoleDetailComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    RoleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerInterceptorService,
      multi: true
    },
    SpinnerService
  ]
})
export class RoleModule { }
