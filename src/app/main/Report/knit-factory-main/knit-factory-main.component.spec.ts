import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnitFactoryMainComponent } from './knit-factory-main.component';

describe('KnitFactoryMainComponent', () => {
  let component: KnitFactoryMainComponent;
  let fixture: ComponentFixture<KnitFactoryMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnitFactoryMainComponent]
    });
    fixture = TestBed.createComponent(KnitFactoryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
