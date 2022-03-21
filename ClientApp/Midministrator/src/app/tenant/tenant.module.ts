import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';

import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantDetailComponent } from './tenant-detail/tenant-detail.component';
import { TenantService } from '../services/tenant/tenant.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerInterceptorService } from '../base/server-interceptor.service';
import { SpinnerService } from '../services/spinner.service';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    TenantListComponent,
    TenantDetailComponent
  ],
  imports: [
    CommonModule,
    TenantRoutingModule,
    MaterialModule
  ],
  providers: [
    TenantService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerInterceptorService,
      multi: true
    },
    SpinnerService
  ]
})
export class TenantModule { }
