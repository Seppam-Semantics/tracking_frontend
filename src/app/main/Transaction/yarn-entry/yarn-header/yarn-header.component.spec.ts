 import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnHeaderComponent } from './yarn-header.component';

describe('YarnHeaderComponent', () => {
  let component: YarnHeaderComponent;
  let fixture: ComponentFixture<YarnHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YarnHeaderComponent]
    });
    fixture = TestBed.createComponent(YarnHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
