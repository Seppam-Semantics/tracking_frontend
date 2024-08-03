import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineAllocationUpdateComponent } from './line-allocation-update.component';

describe('LineAllocationUpdateComponent', () => {
  let component: LineAllocationUpdateComponent;
  let fixture: ComponentFixture<LineAllocationUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineAllocationUpdateComponent]
    });
    fixture = TestBed.createComponent(LineAllocationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
