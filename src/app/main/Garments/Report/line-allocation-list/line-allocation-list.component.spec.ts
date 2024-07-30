import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineAllocationListComponent } from './line-allocation-list.component';

describe('LineAllocationListComponent', () => {
  let component: LineAllocationListComponent;
  let fixture: ComponentFixture<LineAllocationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineAllocationListComponent]
    });
    fixture = TestBed.createComponent(LineAllocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
