import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesCreationComponent } from './expedientes-creation.component';

describe('ExpedientesCreationComponent', () => {
  let component: ExpedientesCreationComponent;
  let fixture: ComponentFixture<ExpedientesCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedientesCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedientesCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
