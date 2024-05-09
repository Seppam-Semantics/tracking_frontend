import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnReconciliationComponent } from './yarn-reconciliation.component';

describe('YarnReconciliationComponent', () => {
  let component: YarnReconciliationComponent;
  let fixture: ComponentFixture<YarnReconciliationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YarnReconciliationComponent]
    });
    fixture = TestBed.createComponent(YarnReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
