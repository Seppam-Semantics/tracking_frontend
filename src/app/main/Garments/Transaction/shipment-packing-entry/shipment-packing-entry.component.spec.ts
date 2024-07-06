import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentPackingEntryComponent } from './shipment-packing-entry.component';

describe('ShipmentPackingEntryComponent', () => {
  let component: ShipmentPackingEntryComponent;
  let fixture: ComponentFixture<ShipmentPackingEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentPackingEntryComponent]
    });
    fixture = TestBed.createComponent(ShipmentPackingEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
