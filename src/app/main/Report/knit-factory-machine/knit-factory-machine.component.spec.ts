import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnitFactoryMachineComponent } from './knit-factory-machine.component';

describe('KnitFactoryMachineComponent', () => {
  let component: KnitFactoryMachineComponent;
  let fixture: ComponentFixture<KnitFactoryMachineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnitFactoryMachineComponent]
    });
    fixture = TestBed.createComponent(KnitFactoryMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
