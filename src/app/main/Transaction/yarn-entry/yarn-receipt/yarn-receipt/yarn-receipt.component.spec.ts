import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnReceiptComponent } from './yarn-receipt.component';

describe('YarnReceiptComponent', () => {
  let component: YarnReceiptComponent;
  let fixture: ComponentFixture<YarnReceiptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YarnReceiptComponent]
    });
    fixture = TestBed.createComponent(YarnReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
