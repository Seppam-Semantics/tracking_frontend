import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentListingListComponent } from './shipment-listing-list.component';

describe('ShipmentListingListComponent', () => {
  let component: ShipmentListingListComponent;
  let fixture: ComponentFixture<ShipmentListingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentListingListComponent]
    });
    fixture = TestBed.createComponent(ShipmentListingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
