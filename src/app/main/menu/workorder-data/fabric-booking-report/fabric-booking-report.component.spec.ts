import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricBookingReportComponent } from './fabric-booking-report.component';

describe('FabricBookingReportComponent', () => {
  let component: FabricBookingReportComponent;
  let fixture: ComponentFixture<FabricBookingReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricBookingReportComponent]
    });
    fixture = TestBed.createComponent(FabricBookingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
