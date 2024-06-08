import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyeFtyCreationComponent } from './dye-fty-creation.component';

describe('DyeFtyCreationComponent', () => {
  let component: DyeFtyCreationComponent;
  let fixture: ComponentFixture<DyeFtyCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DyeFtyCreationComponent]
    });
    fixture = TestBed.createComponent(DyeFtyCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
