import { Component, OnInit, ViewChild } from '@angular/core';
import { IdentityResourceService } from 'src/app/services/identity-resource/identity-resource.service';
import { IdentityResource } from 'src/app/models/identity-resource';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-identity-resource-list',
  templateUrl: './identity-resource-list.component.html',
  styleUrls: ['./identity-resource-list.component.scss']
})
export class IdentityResourceListComponent implements OnInit {

  identityResources: IdentityResource[];
  dataSource: MatTableDataSource<IdentityResource>;
  displayedColumns: string[] = ['edit', 'name', 'displayName', 'updated', 'enabled' ];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public identityResourceService: IdentityResourceService) { }

  ngOnInit() {
    this.identityResourceService.getIdentityResources().subscribe({
      next: resources => { this.dataSource = new MatTableDataSource(resources); },
      error: msg => { console.error(msg); }
    });
  }

}
