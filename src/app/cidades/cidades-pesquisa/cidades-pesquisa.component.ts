import { Component, OnInit, ViewChild } from '@angular/core';
import { CidadeFiltro, CidadesService } from '../cidades.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-cidades-pesquisa',
  templateUrl: './cidades-pesquisa.component.html',
  styleUrls: ['./cidades-pesquisa.component.css']
})
export class CidadesPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new CidadeFiltro();
  cidades = [];

  @ViewChild('tabela', { static: true }) grid;
  constructor(
    private cidadesService: CidadesService,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.cidadesService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.cidades = resultado.cidades;

      });

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(cidade: any) {
    this.confirmation.confirm({
      message: " Deseja mesmo excluir esse registro",
      accept: () => {
        this.excluir(cidade);
      }
    });
  }

  excluir(cidade: any) {
    this.cidadesService.excluir(cidade.id).then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      }
      else {
        this.grid.first = 1;
      }
    })
  }

}


