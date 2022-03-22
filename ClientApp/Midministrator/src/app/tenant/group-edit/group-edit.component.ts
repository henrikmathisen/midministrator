import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})

export class GroupEditComponent implements OnInit {

  @Input() tenantId = 0;

  groupsForTenant$: Observable<Group[]>;
  availableGroups$: Observable<Group[]>;

  groupRowDef: string[] = [ 'name', 'adfssid', 'azureId' ]

  constructor(private groupService: GroupService)
  {
    this.availableGroups$ = this.groupService.getGroups();
  }

  ngOnInit(): void {
    if (this.tenantId > 0) {
      this.groupsForTenant$  = this.groupService.getGroupsForTenant(this.tenantId);
    }
  }

}
