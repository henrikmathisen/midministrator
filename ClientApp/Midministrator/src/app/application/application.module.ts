import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';
import { ApplicationService } from '../services/application/application.service';
import { FormsModule }  from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ClientService } from '../services/client/client.service';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';

@NgModule({
  declarations: [ApplicationListComponent, ApplicationDetailComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  providers : [ ApplicationService, ClientService ]
})
export class ApplicationModule { }
