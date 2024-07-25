import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineMachineListComponent } from './line-machine-list.component';

describe('LineMachineListComponent', () => {
  let component: LineMachineListComponent;
  let fixture: ComponentFixture<LineMachineListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineMachineListComponent]
    });
    fixture = TestBed.createComponent(LineMachineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
