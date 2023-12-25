import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesProfileRootComponent } from './roles-profile-root.component';

describe('RolesProfileRootComponent', () => {
  let component: RolesProfileRootComponent;
  let fixture: ComponentFixture<RolesProfileRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolesProfileRootComponent]
    });
    fixture = TestBed.createComponent(RolesProfileRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
