import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group/group.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TenantService } from 'src/app/services/tenant/tenant.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})

export class GroupEditComponent implements OnInit {

  @Input() tenantId = 0;
  @Input() tenantName = '';

  groupsForTenant$: Observable<Group[]>;
  availableGroups$: Observable<Group[]>;
  groupsAvailableForAssignment$: Observable<Group[]>;

  groupRowDef: string[] = [ 'name', 'adfssid', 'azureId' ]

  constructor(private groupService: GroupService, private dialog: MatDialog, private tenantService: TenantService,
    private spinnerService: SpinnerService)
  {
    this.availableGroups$ = this.groupService.getGroups();
  }

  ngOnInit(): void {
    if (this.tenantId > 0) {
      this.groupsForTenant$  = this.groupService.getGroupsForTenant(this.tenantId);
    } else {
      this.groupsForTenant$ = new Observable();
    }
    this.groupsAvailableForAssignment$ = combineLatest([this.groupsForTenant$, this.availableGroups$],
        (groupsAssigned, availableGroups) => {
          return availableGroups.filter(x => groupsAssigned.findIndex(p => p.id === x.id) === -1);
        });
  }

  addGroupToTenant(group: Group) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: { title: 'Add group?', content: `Do you wish to add the group: ${group.name} to tenant: ${this.tenantName}?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinnerService.spin$.next(true);
        this.tenantService.addTenantToGroup(group.id, this.tenantId).subscribe({
          next: () =>  this.groupsForTenant$ = this.groupService.getGroupsForTenant(this.tenantId),
          error: error => console.error(error),
          complete: () => this.spinnerService.spin$.next(false)
        })
      }
    });
  }

  removeGroupFromTenant(group: Group) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: { title: 'Remove group?', content: `Do you wish to remove the group: ${group.name} from tenant: ${this.tenantName}?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinnerService.spin$.next(true);
        this.tenantService.removeTenantFromGroup(group.id, this.tenantId).subscribe({
          next: () =>  this.groupsForTenant$ = this.groupService.getGroupsForTenant(this.tenantId),
          error: error => console.error(error),
          complete: () => this.spinnerService.spin$.next(false)
        })
      }
    });
  }

}
