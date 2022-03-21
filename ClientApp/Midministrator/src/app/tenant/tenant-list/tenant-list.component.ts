import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tenant } from 'src/app/models/tenant';
import { TenantService } from 'src/app/services/tenant/tenant.service';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent implements OnInit {

  displayedColumns = [ 'edit', 'name', 'identifier', 'created' ];

  constructor(public tenantService: TenantService)
  {

  }

  ngOnInit(): void {

  }

}
