import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnTypeCreationComponent } from './yarn-type-creation.component';

describe('YarnTypeCreationComponent', () => {
  let component: YarnTypeCreationComponent;
  let fixture: ComponentFixture<YarnTypeCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YarnTypeCreationComponent]
    });
    fixture = TestBed.createComponent(YarnTypeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
