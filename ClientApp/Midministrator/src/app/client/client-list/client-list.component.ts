import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Client } from 'src/app/models/client';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { SpinnerService } from 'src/app/services/spinner.service';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clients: Client[];
  dataSource = new MatTableDataSource();
  resultsLength = 0;
  isLoadingResults = false;
  displayedColumns: string[] = ['edit', 'clientId', 'clientName', 'description', 'enabled' ];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public clientService: ClientService, private spinner: SpinnerService) { }


  ngOnInit() {

  }

  ngAfterViewInit(): void {

    this.spinner.spin$.next(true);
    this.clientService.getClients().subscribe(
      {
      next: data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.spinner.spin$.next(false);
      }
    })
  }

}
