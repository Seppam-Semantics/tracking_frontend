import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeCreationComponent } from './size-creation.component';

describe('SizeCreationComponent', () => {
  let component: SizeCreationComponent;
  let fixture: ComponentFixture<SizeCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SizeCreationComponent]
    });
    fixture = TestBed.createComponent(SizeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
