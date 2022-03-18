import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientService } from '../services/client/client.service';
import { ClientRoutingModule } from './client-routing.module';
import { MaterialModule } from '../material.module';
import { IntegerToBooleanPipe } from '../shared/pipes/integer-to-boolean.pipe';
import { FormsModule, ReactiveFormsModule, FormBuilder }    from '@angular/forms';
import { ServerInterceptorService } from '../base/server-interceptor.service';
import { SpinnerService } from '../services/spinner.service';


@NgModule({
  declarations: [ClientListComponent, ClientDetailComponent, IntegerToBooleanPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    ClientRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ ClientService, FormBuilder, SpinnerService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ServerInterceptorService,
    multi: true
  }
]
})
export class ClientModule { }
