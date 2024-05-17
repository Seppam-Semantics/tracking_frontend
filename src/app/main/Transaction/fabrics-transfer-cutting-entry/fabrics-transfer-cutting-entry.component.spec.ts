import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricsTransferCuttingEntryComponent } from './fabrics-transfer-cutting-entry.component';

describe('FabricsTransferCuttingEntryComponent', () => {
  let component: FabricsTransferCuttingEntryComponent;
  let fixture: ComponentFixture<FabricsTransferCuttingEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricsTransferCuttingEntryComponent]
    });
    fixture = TestBed.createComponent(FabricsTransferCuttingEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
