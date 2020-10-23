import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosService } from '../pedidos.service';
import { ClientesService } from '../../clientes/clientes.service';
import { Pedido } from 'src/app/core/model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pedidos-cadastro',
  templateUrl: './pedidos-cadastro.component.html',
  styleUrls: ['./pedidos-cadastro.component.css']
})

export class PedidosCadastroComponent implements OnInit {
  pt: any;
  pedido = new Pedido();
  exibirFormularioItem = false;
  clientes = [];

  constructor(private route: ActivatedRoute,
    private pedidosService: PedidosService,
    private clientesService: ClientesService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    }

    const idPedido = this.route.snapshot.params['id'];

    if (idPedido) {
      this.carregarPedido(idPedido);
    }
  }


  prepararNovoItem() {
    this.exibirFormularioItem = true;
  }

  closeForm() {
    this.exibirFormularioItem = false;
  }

  carregarPedido(id: number) {
    this.pedidosService.buscarPorId(id).then(pedido => {
      this.pedido = pedido;
    })
  }

  carregarClientes(event) {
    const query = event.query;
    this.clientesService.getClientes(query).then(clientes => {
      this.clientes = clientes;
    })
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPedido(form);
    } else {
      this.adicionarPedido(form);
    }
  }

  adicionarPedido(form: FormControl) {
    this.pedidosService.adicionar(this.pedido).then(pedidoAdicionado => {
      this.messageService.add({ severity: 'success', detail: 'Pedido adicionado com sucesso!' });
      this.router.navigate(["/pedidos"]);
    }).catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPedido(form: FormControl) {
    this.pedidosService.atualizar(this.pedido).then(pedidoAtualizado => {
      this.pedido = pedidoAtualizado;
      this.messageService.add({ severity: 'success', detail: 'Pedido atualizado com sucesso!' });
    }).catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pedido.id);
  }
}