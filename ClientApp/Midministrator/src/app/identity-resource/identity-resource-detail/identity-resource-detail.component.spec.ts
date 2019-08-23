import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityResourceDetailComponent } from './identity-resource-detail.component';

describe('IdentityResourceDetailComponent', () => {
  let component: IdentityResourceDetailComponent;
  let fixture: ComponentFixture<IdentityResourceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityResourceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityResourceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
