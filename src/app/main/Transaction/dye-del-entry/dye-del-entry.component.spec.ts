import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyeDelEntryComponent } from './dye-del-entry.component';

describe('DyeDelEntryComponent', () => {
  let component: DyeDelEntryComponent;
  let fixture: ComponentFixture<DyeDelEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DyeDelEntryComponent]
    });
    fixture = TestBed.createComponent(DyeDelEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
