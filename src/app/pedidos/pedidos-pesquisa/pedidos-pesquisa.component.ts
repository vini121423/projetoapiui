import { ErrorHandlerService } from '../../core/error-handler.service';
import { PedidoFiltro, PedidosService } from './../pedidos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-pedidos-pesquisa',
  templateUrl: './pedidos-pesquisa.component.html',
  styleUrls: ['./pedidos-pesquisa.component.css']
})
export class PedidosPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new PedidoFiltro();
  pedidos = [];

  @ViewChild('tabela6', { static: true }) grid;
  constructor(private pedidoService: PedidosService,
    private confirm: ConfirmationService,
    private msg: MessageService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit() { this.pesquisar(); }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pedidoService.pesquisar(this.filtro).then(resultado => {
      this.totalRegistros = resultado.total;
      this.pedidos = resultado.pedidos;
    });
  }

  mudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }


  confirmExclusao(produto: any) {
    this.confirm.confirm({
      message: 'Tem certeza que deseja excluir esse pedido? A ação não poderá ser desfeita',
      accept: () => {
        this.excluir(produto);
      }
    })
  }

  excluir(pedido: any) {
    this.pedidoService.excluir(pedido.id).then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }
      this.msg.add({ severity: 'success', detail: 'Pedido excluído, essa ação não pode ser desfeita', summary: 'Atenção' });
    }).catch(erro => this.errorHandler.handle(erro));
  }


}
