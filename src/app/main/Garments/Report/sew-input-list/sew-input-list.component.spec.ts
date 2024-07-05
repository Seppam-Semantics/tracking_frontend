import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewInputListComponent } from './sew-input-list.component';

describe('SewInputListComponent', () => {
  let component: SewInputListComponent;
  let fixture: ComponentFixture<SewInputListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SewInputListComponent]
    });
    fixture = TestBed.createComponent(SewInputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
