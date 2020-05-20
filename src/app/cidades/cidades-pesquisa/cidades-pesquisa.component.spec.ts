import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadesPesquisaComponent } from './cidades-pesquisa.component';

describe('CidadesPesquisaComponent', () => {
  let component: CidadesPesquisaComponent;
  let fixture: ComponentFixture<CidadesPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CidadesPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CidadesPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
