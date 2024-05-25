import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayKnitComponent } from './day-knit.component';

describe('DayKnitComponent', () => {
  let component: DayKnitComponent;
  let fixture: ComponentFixture<DayKnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayKnitComponent]
    });
    fixture = TestBed.createComponent(DayKnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
