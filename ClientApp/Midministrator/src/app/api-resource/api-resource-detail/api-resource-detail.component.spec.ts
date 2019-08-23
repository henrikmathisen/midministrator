import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiResourceDetailComponent } from './api-resource-detail.component';

describe('ApiResourceDetailComponent', () => {
  let component: ApiResourceDetailComponent;
  let fixture: ComponentFixture<ApiResourceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiResourceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiResourceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
