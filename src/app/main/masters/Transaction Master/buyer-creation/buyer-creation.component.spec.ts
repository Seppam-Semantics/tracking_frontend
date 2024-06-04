import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerCreationComponent } from './buyer-creation.component';

describe('BuyerCreationComponent', () => {
  let component: BuyerCreationComponent;
  let fixture: ComponentFixture<BuyerCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerCreationComponent]
    });
    fixture = TestBed.createComponent(BuyerCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
