import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnitFtyCreationComponent } from './knit-fty-creation.component';

describe('KnitFtyCreationComponent', () => {
  let component: KnitFtyCreationComponent;
  let fixture: ComponentFixture<KnitFtyCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnitFtyCreationComponent]
    });
    fixture = TestBed.createComponent(KnitFtyCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
