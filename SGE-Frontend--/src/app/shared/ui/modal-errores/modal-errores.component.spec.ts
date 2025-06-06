import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErroresComponent } from './modal-errores.component';

describe('ModalErroresComponent', () => {
  let component: ModalErroresComponent;
  let fixture: ComponentFixture<ModalErroresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalErroresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalErroresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
