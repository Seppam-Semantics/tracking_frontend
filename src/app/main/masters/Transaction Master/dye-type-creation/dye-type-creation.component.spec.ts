import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyeTypeCreationComponent } from './dye-type-creation.component';

describe('DyeTypeCreationComponent', () => {
  let component: DyeTypeCreationComponent;
  let fixture: ComponentFixture<DyeTypeCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DyeTypeCreationComponent]
    });
    fixture = TestBed.createComponent(DyeTypeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
