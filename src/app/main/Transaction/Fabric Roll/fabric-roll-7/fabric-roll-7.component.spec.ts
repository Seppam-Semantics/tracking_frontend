import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricRoll7Component } from './fabric-roll-7.component';

describe('FabricRoll7Component', () => {
  let component: FabricRoll7Component;
  let fixture: ComponentFixture<FabricRoll7Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricRoll7Component]
    });
    fixture = TestBed.createComponent(FabricRoll7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
