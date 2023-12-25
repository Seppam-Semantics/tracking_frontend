import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricRoll5Component } from './fabric-roll-5.component';

describe('FabricRoll5Component', () => {
  let component: FabricRoll5Component;
  let fixture: ComponentFixture<FabricRoll5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricRoll5Component]
    });
    fixture = TestBed.createComponent(FabricRoll5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
