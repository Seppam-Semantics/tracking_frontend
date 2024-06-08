import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionMasteRootComponent } from './transaction-maste-root.component';

describe('TransactionMasteRootComponent', () => {
  let component: TransactionMasteRootComponent;
  let fixture: ComponentFixture<TransactionMasteRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionMasteRootComponent]
    });
    fixture = TestBed.createComponent(TransactionMasteRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
