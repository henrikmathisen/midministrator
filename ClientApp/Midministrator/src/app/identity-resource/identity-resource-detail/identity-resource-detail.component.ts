import { Component, OnInit } from '@angular/core';
import { IdentityResourceService } from 'src/app/services/identity-resource/identity-resource.service';
import { ActivatedRoute } from '@angular/router';
import { IdentityResource, IdentityClaim } from 'src/app/models/identity-resource';
import { Location } from '@angular/common';
import { MatChipInputEvent } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-identity-resource-detail',
  templateUrl: './identity-resource-detail.component.html',
  styleUrls: ['./identity-resource-detail.component.scss']
})
export class IdentityResourceDetailComponent implements OnInit {

  
  identityResource: IdentityResource;
  
  readonly enterKeyCode: number[] = [ENTER];
  private submitted: boolean = false;
  
  constructor(public identityResourceService: IdentityResourceService, private location: Location, private route: ActivatedRoute,
    private spinner: SpinnerService) { }

  ngOnInit() {
    this.spinner.spin$.next(true);
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
      this.identityResourceService.getIdentityResource(id).subscribe({
        next: resource => { this.identityResource = resource; this.spinner.spin$.next(false); },
        error: msg =>  { console.error(msg); this.spinner.spin$.next(false); }
      });
    } else {
      this.identityResource = new IdentityResource();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.identityResource.id > 0) {
      this.identityResourceService.updateIdentityResource(this.identityResource).subscribe({
        next: updated => { this.submitted = false; this.location.back(); },
        error: msg => { console.error(msg); this.submitted = false; }
      })
    } else {
      this.identityResourceService.createIdentityResource(this.identityResource).subscribe({
        next: id => { this.submitted = false; this.location.back(); },
        error: msg => { this.submitted = false; console.error(msg); }
      })
    }
  }

  onCancel() {
    this.location.back();
  }

  removeClaim(claim: IdentityClaim) {
    const idx = this.identityResource.userClaims.indexOf(claim);
    if (idx >= 0) {
      this.identityResource.userClaims.splice(idx, 1);
    }
  }

  addClaim(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.identityResource.userClaims.push({
        id: 0,
        type: value,
        identityResourceId: this.identityResource.id
      });
      input.value = '';
    }
  }

}
