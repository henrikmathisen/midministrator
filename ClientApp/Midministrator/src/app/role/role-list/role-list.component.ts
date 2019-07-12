import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from 'src/app/services/role/role.service';
import { Role } from 'src/app/models/role';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  dataSource: MatTableDataSource<Role>;
  displayedColumns = ['edit', 'name', 'created', 'modified', 'isDeleted'];
  @ViewChild(MatSort, {static: true }) sort: MatSort;

  constructor(public roleService: RoleService) { }

  ngOnInit() {
    this.roleService.getRoles().subscribe({
      next: roles => { console.log(roles); this.dataSource = new MatTableDataSource(roles); this.dataSource.sort = this.sort; },
      error: msg => { console.error(msg) }
    })
  }
  ngAfterViewInit(): void {
    
  }

}
