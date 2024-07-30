import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineAllocationEntryComponent } from './line-allocation-entry.component';

describe('LineAllocationEntryComponent', () => {
  let component: LineAllocationEntryComponent;
  let fixture: ComponentFixture<LineAllocationEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineAllocationEntryComponent]
    });
    fixture = TestBed.createComponent(LineAllocationEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
