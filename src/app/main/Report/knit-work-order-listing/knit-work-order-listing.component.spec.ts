import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnitWorkOrderListingComponent } from './knit-work-order-listing.component';

describe('KnitWorkOrderListingComponent', () => {
  let component: KnitWorkOrderListingComponent;
  let fixture: ComponentFixture<KnitWorkOrderListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnitWorkOrderListingComponent]
    });
    fixture = TestBed.createComponent(KnitWorkOrderListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
