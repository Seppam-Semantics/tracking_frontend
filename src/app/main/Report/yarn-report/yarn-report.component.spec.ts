import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnReportComponent } from './yarn-report.component';

describe('YarnReportComponent', () => {
  let component: YarnReportComponent;
  let fixture: ComponentFixture<YarnReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YarnReportComponent]
    });
    fixture = TestBed.createComponent(YarnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
