import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricRollEntry3Component } from './fabric-roll-entry-3.component';

describe('FabricRollEntry3Component', () => {
  let component: FabricRollEntry3Component;
  let fixture: ComponentFixture<FabricRollEntry3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricRollEntry3Component]
    });
    fixture = TestBed.createComponent(FabricRollEntry3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
