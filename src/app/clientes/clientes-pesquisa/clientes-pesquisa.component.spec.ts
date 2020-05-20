import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesPesquisaComponent } from './clientes-pesquisa.component';

describe('ClientesPesquisaComponent', () => {
  let component: ClientesPesquisaComponent;
  let fixture: ComponentFixture<ClientesPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
