import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnitFactoryMachineEntryComponent } from './knit-factory-machine-entry.component';

describe('KnitFactoryMachineEntryComponent', () => {
  let component: KnitFactoryMachineEntryComponent;
  let fixture: ComponentFixture<KnitFactoryMachineEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnitFactoryMachineEntryComponent]
    });
    fixture = TestBed.createComponent(KnitFactoryMachineEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
