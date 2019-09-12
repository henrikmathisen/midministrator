import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group/group.service';
import { Group } from 'src/app/models/group';
import { MatTableDataSource } from '@angular/material';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  dataSource: MatTableDataSource<Group>;
  displayedColumns = [ 'edit', 'name', 'mail', 'azureId', 'adfssid', 'created' ];

  constructor(private groupService: GroupService, private spinner: SpinnerService) { }

  ngOnInit() {
    this.spinner.spin$.next(true);
    this.groupService.getGroups().subscribe({
      next: groups => { this.dataSource = new MatTableDataSource(groups); this.spinner.spin$.next(false); },
      error: msg => { console.error(msg); this.spinner.spin$.next(false); }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
