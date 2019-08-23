import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group/group.service';
import { ApplicationService } from 'src/app/services/application/application.service';
import { RoleService } from 'src/app/services/role/role.service';
import { TenantService } from 'src/app/services/tenant/tenant.service';
import { Application } from 'src/app/models/application';
import { Role } from 'src/app/models/role';
import { Tenant } from 'src/app/models/tenant';
import { Group } from 'src/app/models/group';
import { MatTableDataSource } from '@angular/material';
import { ApplicationRole } from 'src/app/models/application-role';
import { Location } from '@angular/common';

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
  roleTableSource: MatTableDataSource<ApplicationRole>;
  roleTableColumns = ['application', 'role', 'tenant', 'remove' ];
  submitted = false;

  constructor(private route: ActivatedRoute, private groupService: GroupService, private applicationService: ApplicationService,
    private roleService: RoleService, private tenantService: TenantService, private location: Location) { }

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
      this.groupService.getGroup(id).subscribe({
        next: group => 
        { 
          this.group = group; 
          this.roleTableSource = new MatTableDataSource(group.applicationRoles.filter(p => !p.isDeleted && p.isActive));
        },
        error: msg => console.error(msg)
      });
    }
  }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.submitted = true;
    this.groupService.updateGroup(this.group).subscribe({
      next: group => { this.group = group; this.roleTableSource.data = group.applicationRoles.filter(p => !p.isDeleted && p.isActive); this.submitted = false; },
      error: msg => { console.error(msg); this.submitted = false; }
    })
  }

  onRemoveApplicationRole(applicationRole: ApplicationRole): void {
    const idx = this.group.applicationRoles.indexOf(applicationRole);
    if (idx >= 0) {
      this.group.applicationRoles[idx].isDeleted = true;
      this.group.applicationRoles[idx].isActive = false;
      this.group.applicationRoles[idx].deleted = new Date(Date.now())
    }
    this.roleTableSource.data = this.group.applicationRoles.filter(p => !p.isDeleted && p.isActive);
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
    this.roleTableSource.data = this.group.applicationRoles.filter(p => !p.isDeleted && p.isActive);
  }

}
