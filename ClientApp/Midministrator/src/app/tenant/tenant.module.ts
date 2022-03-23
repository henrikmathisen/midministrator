import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';

import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantDetailComponent } from './tenant-detail/tenant-detail.component';
import { TenantService } from '../services/tenant/tenant.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerInterceptorService } from '../base/server-interceptor.service';
import { SpinnerService } from '../services/spinner.service';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupService } from '../services/group/group.service';


@NgModule({
  declarations: [
    TenantListComponent,
    TenantDetailComponent,
    GroupEditComponent
  ],
  imports: [
    CommonModule,
    TenantRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerInterceptorService,
      multi: true
    },
    TenantService,
    GroupService,
    SpinnerService
  ]
})
export class TenantModule { }
