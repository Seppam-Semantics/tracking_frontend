import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfilesComponent } from './add-profiles.component';

describe('AddProfilesComponent', () => {
  let component: AddProfilesComponent;
  let fixture: ComponentFixture<AddProfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProfilesComponent]
    });
    fixture = TestBed.createComponent(AddProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
