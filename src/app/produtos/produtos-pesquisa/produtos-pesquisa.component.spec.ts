import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosPesquisaComponent } from './produtos-pesquisa.component';

describe('ProdutosPesquisaComponent', () => {
  let component: ProdutosPesquisaComponent;
  let fixture: ComponentFixture<ProdutosPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutosPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
