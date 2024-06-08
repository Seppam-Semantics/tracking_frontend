import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricsdiaCreationComponent } from './fabricsdia-creation.component';

describe('FabricsdiaCreationComponent', () => {
  let component: FabricsdiaCreationComponent;
  let fixture: ComponentFixture<FabricsdiaCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricsdiaCreationComponent]
    });
    fixture = TestBed.createComponent(FabricsdiaCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
