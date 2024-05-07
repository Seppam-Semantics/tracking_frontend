import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LCOutstandingComponent } from './lc-outstanding.component';

describe('LCOutstandingComponent', () => {
  let component: LCOutstandingComponent;
  let fixture: ComponentFixture<LCOutstandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LCOutstandingComponent]
    });
    fixture = TestBed.createComponent(LCOutstandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
