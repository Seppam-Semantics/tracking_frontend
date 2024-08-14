import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnaEventUpdateComponent } from './tna-event-update.component';

describe('TnaEventUpdateComponent', () => {
  let component: TnaEventUpdateComponent;
  let fixture: ComponentFixture<TnaEventUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TnaEventUpdateComponent]
    });
    fixture = TestBed.createComponent(TnaEventUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
