import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricRollEntryComponent } from './fabric-roll-entry.component';

describe('FabricRollEntryComponent', () => {
  let component: FabricRollEntryComponent;
  let fixture: ComponentFixture<FabricRollEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricRollEntryComponent]
    });
    fixture = TestBed.createComponent(FabricRollEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
