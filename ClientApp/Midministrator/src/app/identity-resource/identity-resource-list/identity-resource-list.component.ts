import { Component, OnInit, ViewChild } from '@angular/core';
import { IdentityResourceService } from 'src/app/services/identity-resource/identity-resource.service';
import { IdentityResource } from 'src/app/models/identity-resource';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SpinnerService } from 'src/app/services/spinner.service';

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
  constructor(public identityResourceService: IdentityResourceService, private spinner: SpinnerService) { }

  ngOnInit() {
    this.spinner.spin$.next(true);
    this.identityResourceService.getIdentityResources().subscribe({
      next: resources => { this.dataSource = new MatTableDataSource(resources); this.spinner.spin$.next(false); },
      error: msg => { console.error(msg); this.spinner.spin$.next(false); }
    });
  }

}
