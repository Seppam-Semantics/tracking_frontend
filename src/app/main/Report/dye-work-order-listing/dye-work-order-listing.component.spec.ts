import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyeWorkOrderListingComponent } from './dye-work-order-listing.component';

describe('DyeWorkOrderListingComponent', () => {
  let component: DyeWorkOrderListingComponent;
  let fixture: ComponentFixture<DyeWorkOrderListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DyeWorkOrderListingComponent]
    });
    fixture = TestBed.createComponent(DyeWorkOrderListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
