import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of, tap } from 'rxjs';
import { Tenant } from 'src/app/models/tenant';
import { TenantService } from 'src/app/services/tenant/tenant.service';
import { Location } from "@angular/common";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tenant-detail',
  templateUrl: './tenant-detail.component.html',
  styleUrls: ['./tenant-detail.component.scss']
})
export class TenantDetailComponent implements OnInit {

  tenant$: Observable<Tenant>;

  constructor(private route: ActivatedRoute, private tenantService: TenantService, private location: Location,
    private snackBar: MatSnackBar)
  {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
      this.tenant$ = this.tenantService.getTenant(id);
    } else {
      this.tenant$ = of({
        id: 0,
        name: '',
        identifier: null,
        isDeleted: false,
        deleted: null,
        created: null,
        deletedBy: null
      });
    }

  }

  ngOnInit(): void {
  }

  onSaveClick(tenant: Tenant) {
    this.tenant$ = this.tenantService.addOrUpdateTenant(tenant).pipe(
      tap(result => {
        this.snackBar.open("Tenant saved", "OK", {
          duration: 2000
        });
      })
    )
  }

  onCancelClick() {
    this.location.back();
  }

}
