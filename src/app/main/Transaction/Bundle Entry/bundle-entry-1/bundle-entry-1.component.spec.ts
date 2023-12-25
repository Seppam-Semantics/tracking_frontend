import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleEntry1Component } from './bundle-entry-1.component';

describe('BundleEntry1Component', () => {
  let component: BundleEntry1Component;
  let fixture: ComponentFixture<BundleEntry1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BundleEntry1Component]
    });
    fixture = TestBed.createComponent(BundleEntry1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
