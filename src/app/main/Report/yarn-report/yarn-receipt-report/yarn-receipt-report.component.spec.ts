import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnReceiptReportComponent } from './yarn-receipt-report.component';

describe('YarnReceiptReportComponent', () => {
  let component: YarnReceiptReportComponent;
  let fixture: ComponentFixture<YarnReceiptReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YarnReceiptReportComponent]
    });
    fixture = TestBed.createComponent(YarnReceiptReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
