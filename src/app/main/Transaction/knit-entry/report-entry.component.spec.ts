import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEntryComponent } from './report-entry.component';

describe('ReportEntryComponent', () => {
  let component: ReportEntryComponent;
  let fixture: ComponentFixture<ReportEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportEntryComponent]
    });
    fixture = TestBed.createComponent(ReportEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
