import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupService } from '../services/group/group.service';
import { GroupRoutingModule } from './group-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { RoleService } from '../services/role/role.service';
import { ApplicationService } from '../services/application/application.service';
import { TenantService } from '../services/tenant/tenant.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServerInterceptorService } from '../base/server-interceptor.service';
import { SpinnerService } from '../services/spinner.service';


@NgModule({
  declarations: [GroupListComponent, GroupDetailComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GroupService,
    RoleService,
    ApplicationService,
    TenantService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerInterceptorService,
      multi: true
    },
    SpinnerService
  ]
})
export class GroupModule { }
