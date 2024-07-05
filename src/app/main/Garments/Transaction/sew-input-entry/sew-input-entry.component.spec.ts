import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewInputEntryComponent } from './sew-input-entry.component';

describe('SewInputEntryComponent', () => {
  let component: SewInputEntryComponent;
  let fixture: ComponentFixture<SewInputEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SewInputEntryComponent]
    });
    fixture = TestBed.createComponent(SewInputEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
