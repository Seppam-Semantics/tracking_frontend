import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyeBatchReportComponent } from './dye-batch-report.component';

describe('DyeBatchReportComponent', () => {
  let component: DyeBatchReportComponent;
  let fixture: ComponentFixture<DyeBatchReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DyeBatchReportComponent]
    });
    fixture = TestBed.createComponent(DyeBatchReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
