import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyeWorkOrderCreationComponent } from './dye-work-order-creation.component';

describe('DyeWorkOrderCreationComponent', () => {
  let component: DyeWorkOrderCreationComponent;
  let fixture: ComponentFixture<DyeWorkOrderCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DyeWorkOrderCreationComponent]
    });
    fixture = TestBed.createComponent(DyeWorkOrderCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
