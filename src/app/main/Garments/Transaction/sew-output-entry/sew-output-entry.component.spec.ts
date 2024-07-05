import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewOutputEntryComponent } from './sew-output-entry.component';

describe('SewOutputEntryComponent', () => {
  let component: SewOutputEntryComponent;
  let fixture: ComponentFixture<SewOutputEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SewOutputEntryComponent]
    });
    fixture = TestBed.createComponent(SewOutputEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
