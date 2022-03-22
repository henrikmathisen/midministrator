import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Tenant } from 'src/app/models/tenant';
import { TenantService } from 'src/app/services/tenant/tenant.service';

@Component({
  selector: 'app-tenant-detail',
  templateUrl: './tenant-detail.component.html',
  styleUrls: ['./tenant-detail.component.scss']
})
export class TenantDetailComponent implements OnInit {

  tenant$: Observable<Tenant>;

  constructor(private route: ActivatedRoute, private tenantService: TenantService)
  {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tenant$ = this.tenantService.getTenant(id);
  }

  ngOnInit(): void {
  }

}
