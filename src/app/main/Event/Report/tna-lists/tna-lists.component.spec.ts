import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnaListsComponent } from './tna-lists.component';

describe('TnaListsComponent', () => {
  let component: TnaListsComponent;
  let fixture: ComponentFixture<TnaListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TnaListsComponent]
    });
    fixture = TestBed.createComponent(TnaListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
