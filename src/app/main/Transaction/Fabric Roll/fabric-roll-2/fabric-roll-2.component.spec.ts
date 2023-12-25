import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricRoll2Component } from './fabric-roll-2.component';

describe('FabricRoll2Component', () => {
  let component: FabricRoll2Component;
  let fixture: ComponentFixture<FabricRoll2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricRoll2Component]
    });
    fixture = TestBed.createComponent(FabricRoll2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
