import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyeBatchEntryComponent } from './dye-batch-entry.component';

describe('DyeBatchEntryComponent', () => {
  let component: DyeBatchEntryComponent;
  let fixture: ComponentFixture<DyeBatchEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DyeBatchEntryComponent]
    });
    fixture = TestBed.createComponent(DyeBatchEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
