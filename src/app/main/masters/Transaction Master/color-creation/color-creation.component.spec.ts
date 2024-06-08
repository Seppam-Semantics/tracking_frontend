import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorCreationComponent } from './color-creation.component';

describe('ColorCreationComponent', () => {
  let component: ColorCreationComponent;
  let fixture: ComponentFixture<ColorCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorCreationComponent]
    });
    fixture = TestBed.createComponent(ColorCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
