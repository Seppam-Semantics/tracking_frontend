import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricRollDataComponent } from './fabric-roll-data.component';

describe('FabricRollDataComponent', () => {
  let component: FabricRollDataComponent;
  let fixture: ComponentFixture<FabricRollDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricRollDataComponent]
    });
    fixture = TestBed.createComponent(FabricRollDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
