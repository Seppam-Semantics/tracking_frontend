import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricRoll6Component } from './fabric-roll-6.component';

describe('FabricRoll6Component', () => {
  let component: FabricRoll6Component;
  let fixture: ComponentFixture<FabricRoll6Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricRoll6Component]
    });
    fixture = TestBed.createComponent(FabricRoll6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
