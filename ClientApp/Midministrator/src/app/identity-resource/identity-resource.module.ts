import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { IdentityResourceRoutingModule } from './identity-resource-routing.module';
import { IdentityResourceListComponent } from './identity-resource-list/identity-resource-list.component';
import { IdentityResourceDetailComponent } from './identity-resource-detail/identity-resource-detail.component';
import { IdentityResourceService } from '../services/identity-resource/identity-resource.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';


@NgModule({
  declarations: [IdentityResourceListComponent, IdentityResourceDetailComponent],
  imports: [
    CommonModule,
    IdentityResourceRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    NgxTrimDirectiveModule
  ],
  providers: [
    IdentityResourceService
  ]
})
export class IdentityResourceModule { }
