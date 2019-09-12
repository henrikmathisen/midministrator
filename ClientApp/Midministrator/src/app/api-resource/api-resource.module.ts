import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiResourceRoutingModule } from './api-resource-routing.module';
import { ApiResourceListComponent } from './api-resource-list/api-resource-list.component';
import { ApiResourceDetailComponent } from './api-resource-detail/api-resource-detail.component';
import { MaterialModule } from '../material.module';
import { ApiResourceService } from '../services/api-resource/api-resource.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiScopesComponent } from './api-scopes/api-scopes.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { ServerInterceptorService } from '../base/server-interceptor.service';
import { SpinnerService } from '../services/spinner.service';


@NgModule({
  declarations: [ApiResourceListComponent, ApiResourceDetailComponent, ApiScopesComponent],
  imports: [
    CommonModule,
    ApiResourceRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    NgxTrimDirectiveModule
  ],
  providers: [
    ApiResourceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerInterceptorService,
      multi: true
    },
    SpinnerService
  ]
})
export class ApiResourceModule { }
