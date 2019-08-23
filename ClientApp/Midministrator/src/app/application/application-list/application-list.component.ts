import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationService } from 'src/app/services/application/application.service';
import { Application } from 'src/app/models/application';
import { MatTableDataSource, MatSort } from '@angular/material';

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
  displayedColumns: string[] = ['edit', 'name', 'clientName', 'isDeleted'  ];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public applicationService: ApplicationService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this.applicationService.getApplications().subscribe({
      next: apps => 
      { 
        this.dataSource = new MatTableDataSource(apps);
        this.dataSource.sort = this.sort; 
        this.isLoadingResults = false;
      },
      error: msg => { console.error(msg); this.applications = []; this.isLoadingResults = false; }
    })
  }

}
