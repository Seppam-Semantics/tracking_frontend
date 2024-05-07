import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnitFactoryInventoryComponent } from './knit-factory-inventory.component';

describe('KnitFactoryInventoryComponent', () => {
  let component: KnitFactoryInventoryComponent;
  let fixture: ComponentFixture<KnitFactoryInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnitFactoryInventoryComponent]
    });
    fixture = TestBed.createComponent(KnitFactoryInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
