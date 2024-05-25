import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyeBatchComponent } from './dye-batch.component';

describe('DyeBatchComponent', () => {
  let component: DyeBatchComponent;
  let fixture: ComponentFixture<DyeBatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DyeBatchComponent]
    });
    fixture = TestBed.createComponent(DyeBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
