import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewingPackingListComponent } from './sewing-packing-list.component';

describe('SewingPackingListComponent', () => {
  let component: SewingPackingListComponent;
  let fixture: ComponentFixture<SewingPackingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SewingPackingListComponent]
    });
    fixture = TestBed.createComponent(SewingPackingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
