import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewingPackingEntryComponent } from './sewing-packing-entry.component';

describe('SewingPackingEntryComponent', () => {
  let component: SewingPackingEntryComponent;
  let fixture: ComponentFixture<SewingPackingEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SewingPackingEntryComponent]
    });
    fixture = TestBed.createComponent(SewingPackingEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
