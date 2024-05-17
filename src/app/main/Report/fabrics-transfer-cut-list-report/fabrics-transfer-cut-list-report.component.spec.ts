import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricsTransferCutListReportComponent } from './fabrics-transfer-cut-list-report.component';

describe('FabricsTransferCutListReportComponent', () => {
  let component: FabricsTransferCutListReportComponent;
  let fixture: ComponentFixture<FabricsTransferCutListReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricsTransferCutListReportComponent]
    });
    fixture = TestBed.createComponent(FabricsTransferCutListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
