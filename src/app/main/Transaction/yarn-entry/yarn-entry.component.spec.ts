import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnEntryComponent } from './yarn-entry.component';

describe('YarnEntryComponent', () => {
  let component: YarnEntryComponent;
  let fixture: ComponentFixture<YarnEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YarnEntryComponent]
    });
    fixture = TestBed.createComponent(YarnEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
