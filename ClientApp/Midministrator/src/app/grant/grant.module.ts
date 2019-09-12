import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrantRoutingModule } from './grant-routing.module';
import { GrantListComponent } from './grant-list/grant-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GrantService } from '../services/grant/grant.service';
import { MaterialModule } from '../material.module';
import { SpinnerService } from '../services/spinner.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerInterceptorService } from '../base/server-interceptor.service';

@NgModule({
  declarations: [GrantListComponent],
  imports: [
    CommonModule,
    GrantRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    GrantService,
    SpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerInterceptorService,
      multi: true
    }
  ]
})
export class GrantModule { }
