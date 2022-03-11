import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from 'src/app/services/application/application.service';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/models/application';
import { Location } from '@angular/common';
import { Client } from 'src/app/models/client';
import { ErrorMessage } from 'src/app/models/error-message';
import { ClientService } from 'src/app/services/client/client.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss']
})
export class ApplicationDetailComponent implements OnInit {
  @Input() applications: Application[];

  submitted = false;
  availableClients: Client[] = [];
  availableClientsSubject: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>(null);
  application: Application;
  errors: [];
  filteredClients: Observable<Client[]>;
  clientControl = new FormControl();
  readonly enterKeyCode: number[] = [ENTER];
  @ViewChild('clientInput') clientInput: ElementRef<HTMLInputElement>;

  constructor(public applicationService: ApplicationService, public clientService: ClientService,
     private route: ActivatedRoute, private location: Location, private dialog: MatDialog, private spinner: SpinnerService) {
      this.filteredClients = this.clientControl.valueChanges.pipe(startWith(null),
      map((client: Client | null) => client ? this._filter(client, this.availableClients) : this.availableClients.slice()));
  }

  ngOnInit() {
    this.spinner.spin$.next(true);
    const id = +this.route.snapshot.paramMap.get('id');
    this.clientService.getClients().subscribe({
      next: clients => { this.availableClients = clients; console.log(clients); },
      error: msg => 
      { console.error(msg); }
    })
    if (id > 0) {
      this.applicationService.getApplication(id).subscribe({
        next: app => { this.application = app; this.spinner.spin$.next(false); console.log(app); },
        error: msg => { console.error(msg); this.spinner.spin$.next(false); }
      });
    } else {
      this.spinner.spin$.next(false);
      this.application = new Application();
    }
  }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.spinner.spin$.next(true);
    this.submitted = true;
    if (this.application.id < 1) {
      this.applicationService.createApplication(this.application).subscribe({
        next: resp => { this.spinner.spin$.next(false); this.location.back(); },
        error: msg => 
        { 
          console.error(msg); 
          this.submitted = false; 
          this.spinner.spin$.next(false);
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
        next: () => { this.spinner.spin$.next(false); this.location.back(); },
        error: msg => 
        { 
          this.spinner.spin$.next(false);
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

  selectedClient(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    const value = event.option.value;
    
    var existingValue = this.application.clientApplications.filter(val => {
      return val.clientId === value;
    });
    if (existingValue.length < 1) {
      let client = this.availableClients.find(val => val.clientId == value);
      this.application.clientApplications.push({ clientId: client.id, client: client, applicationId: this.application.id, application: null  });
    }
    this.clientInput.nativeElement.value = '';
    this.clientControl.setValue(null);
  }

  remove(value: any, arr: any[]): void {
    const idx = arr.indexOf(value);
    if (idx >= 0) {
      arr.splice(idx, 1);
    }
  }

  // onClientSelection(event: MatSelectChange): void {
  //   const newClient = this.availableClients.filter(c => {
  //     return c.id == event.value;
  //   })
  //   this.application.client = newClient[0];
  // }

  private _filter(value: Client, array: Client[]): Client[] {
    var filtered = [...array];
    filtered = filtered.filter(val => val.clientId.indexOf(value.clientId) === 0);
    console.log(filtered);
    return filtered;
  }

  
}
