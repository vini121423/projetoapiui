import { Component, OnInit, ViewChild } from '@angular/core';
import { CidadeFiltro, CidadesService } from '../cidades.service';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

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
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
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
      message: 'Deseja mesmo excluir esse registro?',
      accept: () => {
        this.excluir(cidade);
      }
    });
  }

  excluir(cidade: any) {
    this.cidadesService.excluir(cidade.id).then(() => {
      if(this.grid.first === 0) {
        this.pesquisar();
      }
      else{
        this.grid.first = 0;
      }
      this.messageService.add({ severity: 'success', summary: 'CONCLUÍDO', detail: 'Cidade excluida com sucesso!' })
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}