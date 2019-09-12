import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { IdentityResourceRoutingModule } from './identity-resource-routing.module';
import { IdentityResourceListComponent } from './identity-resource-list/identity-resource-list.component';
import { IdentityResourceDetailComponent } from './identity-resource-detail/identity-resource-detail.component';
import { IdentityResourceService } from '../services/identity-resource/identity-resource.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { ServerInterceptorService } from '../base/server-interceptor.service';
import { SpinnerService } from '../services/spinner.service';


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
    IdentityResourceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerInterceptorService,
      multi: true
    },
    SpinnerService
  ]
})
export class IdentityResourceModule { }
