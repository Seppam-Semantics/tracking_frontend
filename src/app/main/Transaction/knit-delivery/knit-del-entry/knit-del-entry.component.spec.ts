import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnitDelEntryComponent } from './knit-del-entry.component';

describe('KnitDelEntryComponent', () => {
  let component: KnitDelEntryComponent;
  let fixture: ComponentFixture<KnitDelEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnitDelEntryComponent]
    });
    fixture = TestBed.createComponent(KnitDelEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
