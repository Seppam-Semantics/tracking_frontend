import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnitFactoryWiseComponent } from './knit-factory-wise.component';

describe('KnitFactoryWiseComponent', () => {
  let component: KnitFactoryWiseComponent;
  let fixture: ComponentFixture<KnitFactoryWiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnitFactoryWiseComponent]
    });
    fixture = TestBed.createComponent(KnitFactoryWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
