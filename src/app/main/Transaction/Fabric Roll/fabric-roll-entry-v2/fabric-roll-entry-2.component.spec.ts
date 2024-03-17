import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricRollEntry2Component } from './fabric-roll-entry-2.component';

describe('FabricRollEntryComponent', () => {
  let component: FabricRollEntry2Component;
  let fixture: ComponentFixture<FabricRollEntry2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricRollEntry2Component]
    });
    fixture = TestBed.createComponent(FabricRollEntry2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
