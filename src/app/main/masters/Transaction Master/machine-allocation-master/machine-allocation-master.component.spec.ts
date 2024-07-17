import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineAllocationMasterComponent } from './machine-allocation-master.component';

describe('MachineAllocationMasterComponent', () => {
  let component: MachineAllocationMasterComponent;
  let fixture: ComponentFixture<MachineAllocationMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachineAllocationMasterComponent]
    });
    fixture = TestBed.createComponent(MachineAllocationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
