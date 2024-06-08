import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POMasterCreationComponent } from './po-master-creation.component';

describe('POMasterCreationComponent', () => {
  let component: POMasterCreationComponent;
  let fixture: ComponentFixture<POMasterCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [POMasterCreationComponent]
    });
    fixture = TestBed.createComponent(POMasterCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
