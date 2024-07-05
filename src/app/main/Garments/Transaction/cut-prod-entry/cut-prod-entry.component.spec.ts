import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutProdEntryComponent } from './cut-prod-entry.component';

describe('CutProdEntryComponent', () => {
  let component: CutProdEntryComponent;
  let fixture: ComponentFixture<CutProdEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CutProdEntryComponent]
    });
    fixture = TestBed.createComponent(CutProdEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
