import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosCreationComponent } from './usuarios-creation.component';

describe('UsuariosCreationComponent', () => {
  let component: UsuariosCreationComponent;
  let fixture: ComponentFixture<UsuariosCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
