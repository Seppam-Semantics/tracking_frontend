import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMasterRootComponent } from './event-master-root.component';

describe('EventMasterRootComponent', () => {
  let component: EventMasterRootComponent;
  let fixture: ComponentFixture<EventMasterRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventMasterRootComponent]
    });
    fixture = TestBed.createComponent(EventMasterRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
