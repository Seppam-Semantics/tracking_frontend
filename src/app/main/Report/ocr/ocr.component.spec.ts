import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OCRComponent } from './ocr.component';

describe('OCRComponent', () => {
  let component: OCRComponent;
  let fixture: ComponentFixture<OCRComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OCRComponent]
    });
    fixture = TestBed.createComponent(OCRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
