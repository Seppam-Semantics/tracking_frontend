import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleEventsComponent } from './style-events.component';

describe('StyleEventsComponent', () => {
  let component: StyleEventsComponent;
  let fixture: ComponentFixture<StyleEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StyleEventsComponent]
    });
    fixture = TestBed.createComponent(StyleEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
