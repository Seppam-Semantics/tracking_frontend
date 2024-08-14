import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnaEventsComponent } from './tna-events.component';

describe('TnaEventsComponent', () => {
  let component: TnaEventsComponent;
  let fixture: ComponentFixture<TnaEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TnaEventsComponent]
    });
    fixture = TestBed.createComponent(TnaEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
