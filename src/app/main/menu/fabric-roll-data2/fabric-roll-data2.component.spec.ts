import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricRollData2Component } from './fabric-roll-data2.component';

describe('FabricRollData2Component', () => {
  let component: FabricRollData2Component;
  let fixture: ComponentFixture<FabricRollData2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricRollData2Component]
    });
    fixture = TestBed.createComponent(FabricRollData2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
