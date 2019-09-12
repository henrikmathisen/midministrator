import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { MidentityAccount } from 'src/app/models/account';
import { Location } from '@angular/common';
import { ApplicationService } from 'src/app/services/application/application.service';
import { RoleService } from 'src/app/services/role/role.service';
import { Application } from 'src/app/models/application';
import { Role } from 'src/app/models/role';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
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
  updatingO365 = false;
  revokingGrants = false;
  passwordReset = false;

  user: MidentityAccount;
  applications: Application[];
  tenants: Tenant[];
  roles: Role[];
  groups: Group[];
  groupRoles: Group[];
  roleTableSource: MatTableDataSource<ApplicationRole>;
  deletedApplicationRoles: ApplicationRole[];
  roleTableColumns = ['application', 'role', 'tenant', 'remove' ];

  constructor(public userService: UserService, private route: ActivatedRoute, private location: Location,
    private applicationService: ApplicationService, private roleService: RoleService, private tenantService: TenantService,
    private grantService: GrantService, private spinnerService: SpinnerService, private dialog: MatDialog, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.spinnerService.spin$.next(true);
    const id = +this.route.snapshot.paramMap.get('id');
    this.deletedApplicationRoles = this.deletedApplicationRoles || [];
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
          this.deletedApplicationRoles = user.applicationRoles.filter(p => p.isDeleted);
          user.applicationRoles = user.applicationRoles.filter(p => !p.isDeleted);
          this.user = user; 
          this.user.legacyAccount = this.user.legacyAccount || {};
          this.groups = user.accountGroups.map(x => x.group);
          this.roleTableSource = new MatTableDataSource(user.applicationRoles);
          this.groupRoles = this.groups.filter(x => x.applicationRoles.length > 0);
          this.spinnerService.spin$.next(false);
        },
        error: msg => { console.error(msg); this.spinnerService.spin$.next(false); }
      });
    }
  }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.submitted = true;
    this.spinnerService.spin$.next(true);
    this.user.applicationRoles = this.user.applicationRoles.concat(this.deletedApplicationRoles);
    this.userService.updateUser(this.user).subscribe({
      next: acc => {
        this.deletedApplicationRoles = acc.applicationRoles.filter(x => x.isDeleted);
        acc.applicationRoles = acc.applicationRoles.filter(x => !x.isDeleted);
        this.user = acc; 
        this.spinnerService.spin$.next(false);
        this.snackBar.open("User updated.", "OK");
      },
      error: msg => {
        this.spinnerService.spin$.next(false);
        console.error(msg);
        this.dialog.open(ErrorDialogComponent, {
          data: {
            error: msg.error
          }
        });
      }
    });
  }

  onPasswordReset(event: any): void {
    this.passwordReset = true;
    this.spinnerService.spin$.next(true);
    this.userService.resetPassword(this.user.userName).subscribe({
      next: msg => 
      { 
        this.spinnerService.spin$.next(false);
        this.passwordReset = false;
        this.snackBar.open("Password reset link sent.", "OK");
      }
    });
  }
  
  onRemoveApplicationRole(applicationRole: ApplicationRole): void {
    const idx = this.user.applicationRoles.indexOf(applicationRole);
    if (idx >= 0) {
      this.user.applicationRoles[idx].isDeleted = true;
      this.user.applicationRoles[idx].isActive = false;
      this.user.applicationRoles[idx].deleted = new Date(Date.now())
      this.deletedApplicationRoles.push(this.user.applicationRoles[idx]);
      this.user.applicationRoles.splice(idx, 1);
    }
    this.roleTableSource.data = this.user.applicationRoles;
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
    this.revokingGrants = true;
    this.grantService.removeGrantsForUser(id.toString()).subscribe({ 
      next: val => { 
        this.spinnerService.spin$.next(false); 
        this.revokingGrants = false;
      },
      error: msg => { console.error(msg); this.spinnerService.spin$.next(false); this.revokingGrants = false; }
    });
  }

  onUpdateUserFromO365(event: any): void {
    this.updatingO365 = true;
    this.spinnerService.spin$.next(true);
    this.userService.updateUserFromAzure(this.user).subscribe({
      next: newValues => { 
        this.snackBar.open("Got latest from O365.", "OK");
        this.user = newValues; 
        this.spinnerService.spin$.next(false);
        this.updatingO365 = false;
      },
      error: msg => { 
        this.spinnerService.spin$.next(false);
        this.updatingO365 = false;
        console.error(msg); 
        this.dialog.open(ErrorDialogComponent, {
          data: {
            error: msg.error
          }
        });
      }
    });
  }

}
