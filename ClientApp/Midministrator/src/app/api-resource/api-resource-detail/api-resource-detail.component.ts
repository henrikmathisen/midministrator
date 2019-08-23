import { Component, OnInit } from '@angular/core';
import { ApiResourceService } from 'src/app/services/api-resource/api-resource.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResource, ApiSecret, ApiResourceClaim } from 'src/app/models/api-resource';
import { Location } from '@angular/common';
import { ApiScopesComponent } from '../api-scopes/api-scopes.component';
import { MatChipInputEvent } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-api-resource-detail',
  templateUrl: './api-resource-detail.component.html',
  styleUrls: ['./api-resource-detail.component.scss']
})
export class ApiResourceDetailComponent implements OnInit {

  apiResource: ApiResource;

  readonly enterKeyCode: number[] = [ENTER];
  submitted: boolean = false;

  constructor(public apiResourceService: ApiResourceService, private route: ActivatedRoute, private location: Location) {
    
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
      this.apiResourceService.getApiResource(id).subscribe({
        next: value => { this.apiResource = value; console.log(value); },
        error: msg => console.error(msg)
      });
    } else {
      this.apiResource = new ApiResource();
    }
  }

  removeSecret(secret: ApiSecret) {
    const idx = this.apiResource.secrets.indexOf(secret);
    if (idx >= 0) {
      this.apiResource.secrets.splice(idx, 1);
    }
  }

  addSecret(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      if (value.length > 12) {
        this.apiResource.secrets.push({
          id: 0,
          value: value,
          type: 'SharedSecret',
          description: this.apiResource.displayName,
          expiration: null,
          created: new Date(Date.now()),
          apiResourceId: this.apiResource.id
        });
        input.value = '';
      }
    }
  }

  removeClaim(claim: ApiResourceClaim) {
    const idx = this.apiResource.userClaims.indexOf(claim);
    if (idx >= 0) {
      this.apiResource.userClaims.splice(idx, 1);
    }
  }

  addClaim(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.apiResource.userClaims.push({
        id: 0,
        type: value,
        apiResourceId: this.apiResource.id
      });
      input.value = '';
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.apiResource.id > 0) {
      this.apiResourceService.updateApiResource(this.apiResource).subscribe({
        next: msg => { this.submitted = false; },
        error: msg => { console.error(msg); this.submitted = false; }
      });
    } else {
      this.apiResourceService.createApiResource(this.apiResource).subscribe({
        next: msg => { this.submitted = false; this.location.back(); },
        error: msg => { console.error(msg); this.submitted = false; }
      });
    }
  }

  onCancel() {
    this.location.back();
  }

}
