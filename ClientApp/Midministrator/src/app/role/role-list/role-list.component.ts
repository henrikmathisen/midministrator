import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from 'src/app/services/role/role.service';
import { Role } from 'src/app/models/role';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  dataSource: MatTableDataSource<Role>;
  displayedColumns = ['edit', 'name', 'created', 'modified', 'isDeleted'];
  @ViewChild(MatSort, {static: true }) sort: MatSort;

  constructor(public roleService: RoleService, private spinner: SpinnerService) { }

  ngOnInit() {
    this.spinner.spin$.next(true);
    this.roleService.getRoles().subscribe({
      next: roles => { 
        this.dataSource = new MatTableDataSource(roles); 
        this.dataSource.sort = this.sort; 
        this.spinner.spin$.next(false);
      },
      error: msg => { console.error(msg); this.spinner.spin$.next(false); }
    })
  }
  ngAfterViewInit(): void {
    
  }

}
