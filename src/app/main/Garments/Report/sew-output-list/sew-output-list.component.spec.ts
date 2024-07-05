import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewOutputListComponent } from './sew-output-list.component';

describe('SewOutputListComponent', () => {
  let component: SewOutputListComponent;
  let fixture: ComponentFixture<SewOutputListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SewOutputListComponent]
    });
    fixture = TestBed.createComponent(SewOutputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
