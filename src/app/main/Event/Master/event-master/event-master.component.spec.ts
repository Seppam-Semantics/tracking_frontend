import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMasterComponent } from './event-master.component';

describe('EventMasterComponent', () => {
  let component: EventMasterComponent;
  let fixture: ComponentFixture<EventMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventMasterComponent]
    });
    fixture = TestBed.createComponent(EventMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
