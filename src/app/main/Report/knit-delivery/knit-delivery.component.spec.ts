import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnitDeliveryComponent } from './knit-delivery.component';

describe('KnitDeliveryComponent', () => {
  let component: KnitDeliveryComponent;
  let fixture: ComponentFixture<KnitDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnitDeliveryComponent]
    });
    fixture = TestBed.createComponent(KnitDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
