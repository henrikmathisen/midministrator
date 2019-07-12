import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group/group.service';
import { Group } from 'src/app/models/group';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  dataSource: MatTableDataSource<Group>;
  displayedColumns = [ 'edit', 'name', 'mail', 'azureId', 'adfssid', 'created' ];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.getGroups().subscribe({
      next: groups => { this.dataSource = new MatTableDataSource(groups); },
      error: msg => { console.error(msg); }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
