import { TestBed } from '@angular/core/testing';

import { EventsapiService } from './eventsapi.service';

describe('EventsapiService', () => {
  let service: EventsapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
