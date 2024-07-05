import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutProdListComponent } from './cut-prod-list.component';

describe('CutProdListComponent', () => {
  let component: CutProdListComponent;
  let fixture: ComponentFixture<CutProdListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CutProdListComponent]
    });
    fixture = TestBed.createComponent(CutProdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
