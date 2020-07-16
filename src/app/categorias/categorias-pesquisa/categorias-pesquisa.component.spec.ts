import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasPesquisaComponent } from './categorias-pesquisa.component';

describe('CategoriasPesquisaComponent', () => {
  let component: CategoriasPesquisaComponent;
  let fixture: ComponentFixture<CategoriasPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
