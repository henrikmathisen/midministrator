import { Component, OnInit, Input } from '@angular/core';
import { ApplicationService } from 'src/app/services/application/application.service';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/models/application';
import { Location } from '@angular/common';
import { Client } from 'src/app/models/client';
import { ErrorMessage } from 'src/app/models/error-message';
import { ClientService } from 'src/app/services/client/client.service';
import { MatSelectChange, MatDialog } from '@angular/material';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss']
})
export class ApplicationDetailComponent implements OnInit {
  @Input() applications: Application[];

  submitted = false;
  availableClients: Client[];
  application: Application;
  errors: [];

  constructor(public applicationService: ApplicationService, public clientService: ClientService,
     private route: ActivatedRoute, private location: Location, private dialog: MatDialog) {
    
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clientService.getClients().subscribe({
      next: clients => { this.availableClients = clients; },
      error: msg => 
      { console.error(msg); }
    })
    if (id > 0) {
      this.applicationService.getApplication(id).subscribe({
        next: app => { this.application = app; },
        error: msg => console.error(msg)
      });
    } else {
      this.application = new Application();
    }
  }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.submitted = true;
    this.application.client = null;
    if (this.application.id < 1) {
      this.applicationService.createApplication(this.application).subscribe({
        next: resp => { this.location.back(); },
        error: msg => 
        { 
          console.error(msg); 
          this.submitted = false; 
          this.dialog.open(ErrorDialogComponent, {
            data: {
              error: msg.error,
              statusCode: msg.status
            }
          });
        }
      });
    } else {
      this.applicationService.updateApplication(this.application).subscribe({
        next: () => { this.location.back(); },
        error: msg => 
        { 
          console.error(msg); 
          this.submitted = false; 
          this.dialog.open(ErrorDialogComponent, {
            data: {
              error: msg.error,
              statusCode: msg.status
            }
          });
        }
      })
    }
  }

  onClientSelection(event: MatSelectChange): void {
    const newClient = this.availableClients.filter(c => {
      return c.id == event.value;
    })
    this.application.client = newClient[0];
  }

  
}
