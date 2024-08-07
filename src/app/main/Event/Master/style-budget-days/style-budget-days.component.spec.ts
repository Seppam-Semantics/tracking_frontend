import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleBudgetDaysComponent } from './style-budget-days.component';

describe('StyleBudgetDaysComponent', () => {
  let component: StyleBudgetDaysComponent;
  let fixture: ComponentFixture<StyleBudgetDaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StyleBudgetDaysComponent]
    });
    fixture = TestBed.createComponent(StyleBudgetDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
