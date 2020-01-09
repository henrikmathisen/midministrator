import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Client } from 'src/app/models/client';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInput, MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent, MatChipEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ClientView } from '../../models/client';


@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  submitted = false;
  client: Client;
  availableScopes = [];
  clientView: ClientView;
  readonly accessTokenTypes: { value: number, type: string }[] = [
    { value: 0, type: 'JWT' },
    { value: 1, type: 'Reference' }
  ];
  readonly enterKeyCode: number[] = [ENTER];
  filteredScopes: Observable<string[]>;
  scopeControl = new FormControl();
  @ViewChild('scopeInput', { static: false }) scopeInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(public clientService: ClientService, private route: ActivatedRoute, private location: Location,
    private spinner: SpinnerService) {
    this.filteredScopes = this.scopeControl.valueChanges.pipe(startWith(null),
      map((scope: string | null) => scope ? this._filter(scope, this.availableScopes) : this.availableScopes.slice()));
  }

  ngOnInit() {
    this.spinner.spin$.next(true);
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
      this.clientService.getClient(id).subscribe({
        next: value => { this.client = value.client; this.availableScopes = value.availableScopes; this.clientView = value.clientView || {}; this.spinner.spin$.next(false); },
        error: msg => { console.error(msg); this.spinner.spin$.next(false); }
      });
    } else {
      this.clientService.getAvailableScopes().subscribe({
        next: value => { this.availableScopes = value; this.spinner.spin$.next(false); this.client = new Client(); this.clientView = {}; },
        error: msg => { console.error(msg); this.spinner.spin$.next(false); }
      });
    }
  }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.spinner.spin$.next(true);
    this.submitted = true;
    if (this.client.id > 0) {
      this.clientService.updateClient({ client: this.client, clientView: this.clientView }).subscribe({
        next: resp => { this.spinner.spin$.next(false); this.location.back();  },
        error: msg =>  { this.spinner.spin$.next(false); console.error(msg); this.submitted = false; }
      });
    } else {
      this.clientService.createClient({ client: this.client, clientView: this.clientView }).subscribe({
        next: resp => { this.spinner.spin$.next(false); this.location.back(); },
        error: msg =>  { this.spinner.spin$.next(false); console.error(msg); this.submitted = false; }
      });
    }
  }

  selectedClientScope(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    
    var existingValue = this.client.allowedScopes.filter(val => {
      return val.scope === value;
    });
    if (existingValue.length < 1) {
      if (this.availableScopes.indexOf(value) > -1) 
      {
        this.client.allowedScopes.push({ id: 0, clientId: this.client.id, scope: value });
      }
    }
    this.scopeInput.nativeElement.value = '';
    this.scopeControl.setValue(null);
  }

  add(event: MatChipInputEvent, arr: any[], type: string, additionalValues: { type: string, value: string }[]): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      var exists = arr.filter(x => {
        return x[type] === value;
      });
      if (exists.length < 1) {
        var val = { id: 0, clientId: this.client.id, [type]: event.value };
        if (additionalValues && additionalValues.length > 0) {
          additionalValues.forEach(v => {
            val[v.type] = v.value;
          })
        }
        arr.push(val);
      }
    }

    if (input) {
      input.value = '';
    }
  }

  remove(value: any, arr: any[]): void {
    const idx = arr.indexOf(value);
    if (idx >= 0) {
      arr.splice(idx, 1);
    }
  }


  private _filter(value: string, array: string[]): string[] {
    const filterValue = value.toLowerCase();
    var filtered = [...array];
    return filtered.filter(val => val.toLowerCase().indexOf(filterValue) === 0);
  }

}
