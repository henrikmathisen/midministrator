import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Client } from 'src/app/models/client';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

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

  constructor(public clientService: ClientService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    // this.clientService.getClients().subscribe(data => {
    //   this.dataSource.data = data;
    //   this.dataSource.sort = this.sort;
    // })
    this.clientService.getClients().subscribe(
      {
      next: data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort; 
      }
    })
  }

  onEditClientClick(client: Client): void {
    console.log(client);
  }

  onNewClientClick(): void {
    console.log("new client");
  }

}
