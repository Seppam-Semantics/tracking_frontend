import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderDataComponent } from './workorder-data.component';

describe('WorkorderDataComponent', () => {
  let component: WorkorderDataComponent;
  let fixture: ComponentFixture<WorkorderDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkorderDataComponent]
    });
    fixture = TestBed.createComponent(WorkorderDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
