import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleCreationComponent } from './style-creation.component';

describe('StyleCreationComponent', () => {
  let component: StyleCreationComponent;
  let fixture: ComponentFixture<StyleCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StyleCreationComponent]
    });
    fixture = TestBed.createComponent(StyleCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
