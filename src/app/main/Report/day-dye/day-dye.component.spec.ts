import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayDyeComponent } from './day-dye.component';

describe('DayDyeComponent', () => {
  let component: DayDyeComponent;
  let fixture: ComponentFixture<DayDyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayDyeComponent]
    });
    fixture = TestBed.createComponent(DayDyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
