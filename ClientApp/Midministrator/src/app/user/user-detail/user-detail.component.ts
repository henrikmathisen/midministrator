import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { MidentityAccount } from 'src/app/models/account';
import { Location } from '@angular/common';
import { ApplicationService } from 'src/app/services/application/application.service';
import { RoleService } from 'src/app/services/role/role.service';
import { Application } from 'src/app/models/application';
import { Role } from 'src/app/models/role';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Group } from 'src/app/models/group';
import { ApplicationRole } from 'src/app/models/application-role';
import { TenantService } from 'src/app/services/tenant/tenant.service';
import { Tenant } from 'src/app/models/tenant';
import { GrantService } from 'src/app/services/grant/grant.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  submitted = false;
  user: MidentityAccount;
  applications: Application[];
  tenants: Tenant[];
  roles: Role[];
  groups: Group[];
  groupRoles: Group[];
  roleTableSource: MatTableDataSource<ApplicationRole>;
  roleTableColumns = ['application', 'role', 'tenant', 'remove' ];

  constructor(public userService: UserService, private route: ActivatedRoute, private location: Location,
    private applicationService: ApplicationService, private roleService: RoleService, private tenantService: TenantService,
    private grantService: GrantService, private spinnerService: SpinnerService, private dialog: MatDialog) {

  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
      this.applicationService.getApplications().subscribe({
        next: applications => { this.applications = applications;  }
      });
      this.roleService.getRoles().subscribe({
        next: roles => { this.roles = roles; }
      });
      this.tenantService.getTenants().subscribe({
        next: tenants => { this.tenants = tenants; }
      });
      this.userService.getUser(id).subscribe({
        next: user => 
        {
          this.user = user; 
          this.groups = user.accountGroups.map(x => x.group);
          this.roleTableSource = new MatTableDataSource(user.applicationRoles.filter(p => !p.isDeleted && p.isActive));
          this.groupRoles = this.groups.filter(x => x.applicationRoles.length > 0);
        },
        error: msg => console.error(msg)
      });
    }
  }

  ngAfterViewInit(): void {
    
    
  }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.submitted = true;
    this.userService.updateUser(this.user).subscribe({
      next: acc => { this.user = acc; }
    });
  }

  onPasswordReset(event: any): void {
    event.path[1].disabled = true;
    this.userService.resetPassword(this.user.userName).subscribe({
      next: msg => { event.path[0].innerText = 'Password reset link sent'; }
    });
  }
  
  onRemoveApplicationRole(applicationRole: ApplicationRole): void {
    const idx = this.user.applicationRoles.indexOf(applicationRole);
    if (idx >= 0) {
      this.user.applicationRoles[idx].isDeleted = true;
      this.user.applicationRoles[idx].isActive = false;
      this.user.applicationRoles[idx].deleted = new Date(Date.now())
    }
    this.roleTableSource.data = this.user.applicationRoles.filter(p => !p.isDeleted && p.isActive);
  }

  onAddApplicationRole(): void {
    this.user.applicationRoles.push({
      id: 0,
      accountId: this.user.id,
      roleId: 1,
      applicationId: 1,
      tenantId: null,
      groupId: null,
      isActive: true,
      isDeleted: false,
      created: new Date(Date.now())
    });
    this.roleTableSource.data = this.user.applicationRoles;
  }

  getApplicationName(id: number): string {
    return this.applications.filter(x => x.id == id)[0].name;
  }

  getRoleName(id: number): string {
    return this.roles.filter(x => x.id == id)[0].name;
  }

  onRevokeUserGrants(event: any, id: number): void {
    this.spinnerService.spin$.next(true);
    this.grantService.removeGrantsForUser(id.toString()).subscribe({ 
      next: val => { this.spinnerService.spin$.next(false); event.path[0].innerText = "Grants Revoked"; },
      error: msg => { console.error(msg); this.spinnerService.spin$.next(false); }
    });
  }

  onUpdateUserFromO365(event: any): void {
    const path =  event.path[0];
    this.spinnerService.spin$.next(true);
    event.path[1].disabled = true;
    this.userService.updateUserFromAzure(this.user).subscribe({
      next: newValues => { 
        this.user = newValues; 
        this.spinnerService.spin$.next(false);
        path.innerText = 'Get Latest From O365';
      },
      error: msg => { 
        this.spinnerService.spin$.next(false);
        console.error(msg); 
        path.innerText = 'Get Latest From O365';
        this.dialog.open(ErrorDialogComponent, {
          data: {
            error: msg.error
          }
        });
      }
    });
  }

}
