import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinFtyCreationComponent } from './spin-fty-creation.component';

describe('SpinFtyCreationComponent', () => {
  let component: SpinFtyCreationComponent;
  let fixture: ComponentFixture<SpinFtyCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinFtyCreationComponent]
    });
    fixture = TestBed.createComponent(SpinFtyCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
