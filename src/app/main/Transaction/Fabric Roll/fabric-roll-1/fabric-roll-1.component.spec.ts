import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricRoll1Component } from './fabric-roll-1.component';

describe('FabricRoll1Component', () => {
  let component: FabricRoll1Component;
  let fixture: ComponentFixture<FabricRoll1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricRoll1Component]
    });
    fixture = TestBed.createComponent(FabricRoll1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
