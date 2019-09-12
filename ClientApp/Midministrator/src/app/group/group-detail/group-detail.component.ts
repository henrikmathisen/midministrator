import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group/group.service';
import { ApplicationService } from 'src/app/services/application/application.service';
import { RoleService } from 'src/app/services/role/role.service';
import { TenantService } from 'src/app/services/tenant/tenant.service';
import { Application } from 'src/app/models/application';
import { Role } from 'src/app/models/role';
import { Tenant } from 'src/app/models/tenant';
import { Group } from 'src/app/models/group';
import { MatTableDataSource, MatTable } from '@angular/material';
import { ApplicationRole } from 'src/app/models/application-role';
import { Location } from '@angular/common';
import { MidentityAccount } from 'src/app/models/account';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  applications: Application[];
  roles: Role[];
  tenants: Tenant[];
  group: Group;
  users: MidentityAccount[];
  roleTableSource: MatTableDataSource<ApplicationRole>;
  deletedApplicationRoles: ApplicationRole[];
  roleTableColumns = ['application', 'role', 'tenant', 'remove' ];
  submitted = false;

  @ViewChild('roleTable', {static: true}) roleTable: MatTable<any>;

  constructor(private route: ActivatedRoute, private groupService: GroupService, private applicationService: ApplicationService,
    private roleService: RoleService, private tenantService: TenantService, private location: Location, private spinner: SpinnerService) { }

  ngOnInit() {
    this.spinner.spin$.next(true);
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
      this.groupService.getGroup(id).subscribe({
        next: group => 
        { 
          this.users = group.accountGroups.map(x => x.account);
          this.group = group; 
          this.roleTableSource = new MatTableDataSource(group.applicationRoles);
          this.spinner.spin$.next(false);
        },
        error: msg => console.error(msg)
      });
    }
  }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.spinner.spin$.next(true);
    this.submitted = true;
    this.group.accountGroups = null;
    this.group.applicationRoles = this.group.applicationRoles.concat(this.deletedApplicationRoles);
    this.groupService.updateGroup(this.group).subscribe({
      next: group => { 
        this.group = group; 
        this.submitted = false; 
        this.roleTableSource.data = group.applicationRoles.filter(x => !x.isDeleted && x.isActive); 
        this.roleTable.renderRows(); 
        this.spinner.spin$.next(false);
      },
      error: msg => { console.error(msg); this.submitted = false; this.spinner.spin$.next(false); }
    })
  }

  onRemoveApplicationRole(applicationRole: ApplicationRole): void {
    const idx = this.group.applicationRoles.indexOf(applicationRole);
    if (idx >= 0) {
      if (this.group.applicationRoles[idx].id > 0) {
        this.group.applicationRoles[idx].isDeleted = true;
        this.group.applicationRoles[idx].isActive = false;
        this.group.applicationRoles[idx].deleted = new Date(Date.now());
        this.deletedApplicationRoles.push(this.group.applicationRoles[idx]);
      }
      this.group.applicationRoles.splice(idx, 1);
      this.roleTableSource.data = this.group.applicationRoles;
      this.roleTable.renderRows();
    }

  }


  onAddApplicationRole(): void {
    this.group.applicationRoles.push({
      id: 0,
      accountId: null,
      roleId: 1,
      applicationId: 1,
      tenantId: null,
      groupId: this.group.id,
      isActive: true,
      isDeleted: false,
      created: new Date(Date.now()),
      deleted: null,
      deletedBy: null,
      tenant: null,
      group: null,
      account: null,
      role: null,
      application: null
    });
    this.roleTableSource.data = this.group.applicationRoles;
    this.roleTable.renderRows();
  }

}
