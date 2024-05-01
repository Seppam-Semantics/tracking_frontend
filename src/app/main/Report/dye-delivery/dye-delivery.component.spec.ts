import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyeDeliveryComponent } from './dye-delivery.component';

describe('DyeDeliveryComponent', () => {
  let component: DyeDeliveryComponent;
  let fixture: ComponentFixture<DyeDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DyeDeliveryComponent]
    });
    fixture = TestBed.createComponent(DyeDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
