import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyeFactoryInventoryComponent } from './dye-factory-inventory.component';

describe('DyeFactoryInventoryComponent', () => {
  let component: DyeFactoryInventoryComponent;
  let fixture: ComponentFixture<DyeFactoryInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DyeFactoryInventoryComponent]
    });
    fixture = TestBed.createComponent(DyeFactoryInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
