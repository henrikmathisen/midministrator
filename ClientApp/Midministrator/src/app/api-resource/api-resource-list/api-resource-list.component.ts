import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiResource } from 'src/app/models/api-resource';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ApiResourceService } from 'src/app/services/api-resource/api-resource.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-api-resource-list',
  templateUrl: './api-resource-list.component.html',
  styleUrls: ['./api-resource-list.component.scss']
})
export class ApiResourceListComponent implements OnInit {

  apiResources: ApiResource[];
  dataSource: MatTableDataSource<any>;
  resultsLength = 0;
  isLoadingResults = true;
  displayedColumns: string[] = ['edit', 'name', 'displayName', 'updated'  ];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public apiResourceService: ApiResourceService, private spinner: SpinnerService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this.spinner.spin$.next(true);
    this.apiResourceService.getApiResources().subscribe({
      next: resources => 
      { 
        this.dataSource = new MatTableDataSource(resources);
        this.dataSource.sort = this.sort; 
        this.isLoadingResults = false;
        this.spinner.spin$.next(false);
      },
      error: msg => { console.error(msg); this.apiResources = []; this.isLoadingResults = false; this.spinner.spin$.next(false); }
    })
  }

}
