import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnTranscationComponent } from './yarn-transcation.component';

describe('YarnTranscationComponent', () => {
  let component: YarnTranscationComponent;
  let fixture: ComponentFixture<YarnTranscationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YarnTranscationComponent]
    });
    fixture = TestBed.createComponent(YarnTranscationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
