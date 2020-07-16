import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasCadastroComponent } from './categorias-cadastro.component';

describe('CategoriasCadastroComponent', () => {
  let component: CategoriasCadastroComponent;
  let fixture: ComponentFixture<CategoriasCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
