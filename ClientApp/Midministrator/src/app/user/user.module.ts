import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from '../services/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { SpinnerService } from '../services/spinner.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApplicationService } from '../services/application/application.service';
import { RoleService } from '../services/role/role.service';
import { TenantService } from '../services/tenant/tenant.service';
import { GrantService } from '../services/grant/grant.service';

@NgModule({
  declarations: [UserDetailComponent, UserListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    UserService,
    SpinnerService,
    ApplicationService,
    RoleService,
    TenantService,
    GrantService
  ]
})
export class UserModule { }
