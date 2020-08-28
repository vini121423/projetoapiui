import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosPesquisaComponent } from './pedidos-pesquisa.component';

describe('PedidosPesquisaComponent', () => {
  let component: PedidosPesquisaComponent;
  let fixture: ComponentFixture<PedidosPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
