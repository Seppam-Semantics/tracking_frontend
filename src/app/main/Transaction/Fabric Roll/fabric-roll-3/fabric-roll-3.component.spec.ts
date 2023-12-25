import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricRoll3Component } from './fabric-roll-3.component';

describe('FabricRoll3Component', () => {
  let component: FabricRoll3Component;
  let fixture: ComponentFixture<FabricRoll3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricRoll3Component]
    });
    fixture = TestBed.createComponent(FabricRoll3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
