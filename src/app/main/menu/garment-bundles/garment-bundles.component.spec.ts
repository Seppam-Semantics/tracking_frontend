import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarmentBundlesComponent } from './garment-bundles.component';

describe('GarmentBundlesComponent', () => {
  let component: GarmentBundlesComponent;
  let fixture: ComponentFixture<GarmentBundlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GarmentBundlesComponent]
    });
    fixture = TestBed.createComponent(GarmentBundlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
