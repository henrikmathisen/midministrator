import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ApiScope, ApiResource, ApiScopeClaim } from 'src/app/models/api-resource';
import { MatTableDataSource, MatChipInputEvent } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'api-scopes',
  templateUrl: './api-scopes.component.html',
  styleUrls: ['./api-scopes.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ApiScopesComponent),
      multi: true
    }
  ]
})
export class ApiScopesComponent implements ControlValueAccessor, OnInit {

  @Input() public apiResource: ApiResource;

  readonly enterKeyCode: number[] = [ENTER];
  dataSource: MatTableDataSource<any>;
  displayColumns = [ 'remove', 'displayName', 'name', 'userClaims' ]

  propagateChange = (_: any) => {
    this.dataSource = new MatTableDataSource(_);
  };

  get apiScopes() {
    return this.apiResource.scopes;
  }

  set apiScopes(value: any) {
    this.apiResource.scopes = value;
    this.propagateChange(this.apiResource.scopes);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.apiResource.scopes = value;
    }
  }

  addScope(scope: ApiScope) {
    scope = scope || {
      id: 0,
      name: 'new.scope',
      displayName: 'new scope',
      description: '',
      required: false,
      emphasize: false,
      showInDiscoveryDocument: false,
      apiResourceId: this.apiResource.id,
      userClaims: []
    };
    this.apiResource.scopes.push(scope);
    this.propagateChange(this.apiResource.scopes);
  }

  removeScope(scope: ApiScope) {
    var idx = this.apiResource.scopes.indexOf(scope);
    if (idx >= 0) {
      this.apiResource.scopes.splice(idx, 1);
      this.propagateChange(this.apiResource.scopes);
    }
  }

  removeClaim(scope: ApiScope, claim: ApiScopeClaim) {
    var idx = this.apiResource.scopes.indexOf(scope);
    if (idx >= 0) {
      var claimIdx = this.apiResource.scopes[idx].userClaims.indexOf(claim);
      if (claimIdx >= 0) {
        this.apiResource.scopes[idx].userClaims.splice(claimIdx, 1);
        this.propagateChange(this.apiResource.scopes);
      }
    }
  }

  addClaim(event: MatChipInputEvent, scope: ApiScope) {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      scope.userClaims.push({
        id: 0,
        type: value.trim(),
        apiScopeId: scope.id
      });
      input.value = '';
      this.propagateChange(this.apiResource.scopes);
    }
    
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.apiResource.scopes);
  }

}
