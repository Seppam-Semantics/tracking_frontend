import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejTypeCreationComponent } from './rej-type-creation.component';

describe('RejTypeCreationComponent', () => {
  let component: RejTypeCreationComponent;
  let fixture: ComponentFixture<RejTypeCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejTypeCreationComponent]
    });
    fixture = TestBed.createComponent(RejTypeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
