import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleEntry2Component } from './bundle-entry-2.component';

describe('BundleEntry2Component', () => {
  let component: BundleEntry2Component;
  let fixture: ComponentFixture<BundleEntry2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BundleEntry2Component]
    });
    fixture = TestBed.createComponent(BundleEntry2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
