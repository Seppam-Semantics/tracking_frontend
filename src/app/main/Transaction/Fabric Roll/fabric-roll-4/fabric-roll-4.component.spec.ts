import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricRoll4Component } from './fabric-roll-4.component';

describe('FabricRoll4Component', () => {
  let component: FabricRoll4Component;
  let fixture: ComponentFixture<FabricRoll4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricRoll4Component]
    });
    fixture = TestBed.createComponent(FabricRoll4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
