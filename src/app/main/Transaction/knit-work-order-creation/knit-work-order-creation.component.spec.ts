import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnitWorkOrderCreationComponent } from './knit-work-order-creation.component';

describe('KnitWorkOrderCreationComponent', () => {
  let component: KnitWorkOrderCreationComponent;
  let fixture: ComponentFixture<KnitWorkOrderCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnitWorkOrderCreationComponent]
    });
    fixture = TestBed.createComponent(KnitWorkOrderCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
