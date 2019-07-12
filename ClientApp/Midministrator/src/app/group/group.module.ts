import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupService } from '../services/group/group.service';
import { GroupRoutingModule } from './group-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { RoleService } from '../services/role/role.service';
import { ApplicationService } from '../services/application/application.service';
import { TenantService } from '../services/tenant/tenant.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


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
    TenantService
  ]
})
export class GroupModule { }
