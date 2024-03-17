import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnitReportComponent } from './knit-report.component';

describe('KnitReportComponent', () => {
  let component: KnitReportComponent;
  let fixture: ComponentFixture<KnitReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnitReportComponent]
    });
    fixture = TestBed.createComponent(KnitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
