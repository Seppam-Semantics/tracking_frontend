import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleEntry3Component } from './bundle-entry-3.component';

describe('BundleEntry3Component', () => {
  let component: BundleEntry3Component;
  let fixture: ComponentFixture<BundleEntry3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BundleEntry3Component]
    });
    fixture = TestBed.createComponent(BundleEntry3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
