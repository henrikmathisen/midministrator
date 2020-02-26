import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationService } from 'src/app/services/application/application.service';
import { Application } from 'src/app/models/application';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {

  applications: Application[];
  dataSource: MatTableDataSource<any>;
  resultsLength = 0;
  isLoadingResults = true;
  displayedColumns: string[] = ['edit', 'name', 'clientIds', 'isDeleted'  ];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public applicationService: ApplicationService, private spinner: SpinnerService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this.spinner.spin$.next(true);
    this.applicationService.getApplications().subscribe({
      next: apps => 
      { 
        apps.forEach(p => {
          p.clientIds = p.clientApplications.reduce((a, o) => (a.push(o.client.clientId), a), []);
        })
        this.dataSource = new MatTableDataSource(apps);
        this.dataSource.sort = this.sort; 
        this.isLoadingResults = false;
        this.spinner.spin$.next(false);
      },
      error: msg => { console.error(msg); this.applications = []; this.isLoadingResults = false; this.spinner.spin$.next(false); }
    })
  }

}
