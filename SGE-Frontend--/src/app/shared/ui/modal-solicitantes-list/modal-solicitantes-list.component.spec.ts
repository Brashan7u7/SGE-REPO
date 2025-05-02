import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSolicitantesListComponent } from './modal-solicitantes-list.component';

describe('ModalSolicitantesListComponent', () => {
  let component: ModalSolicitantesListComponent;
  let fixture: ComponentFixture<ModalSolicitantesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSolicitantesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSolicitantesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
