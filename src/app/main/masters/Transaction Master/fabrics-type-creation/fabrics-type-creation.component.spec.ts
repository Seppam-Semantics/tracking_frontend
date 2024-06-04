import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricsTypeCreationComponent } from './fabrics-type-creation.component';

describe('FabricsTypeCreationComponent', () => {
  let component: FabricsTypeCreationComponent;
  let fixture: ComponentFixture<FabricsTypeCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricsTypeCreationComponent]
    });
    fixture = TestBed.createComponent(FabricsTypeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
