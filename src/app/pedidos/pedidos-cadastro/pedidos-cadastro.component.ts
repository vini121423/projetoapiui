import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosService } from '../pedidos.service';
import { ClientesService } from '../../clientes/clientes.service';
import { ProdutosService } from '../../produtos/produtos.service';
import { Pedido } from 'src/app/core/model';
import { Itempedido } from 'src/app/core/model';
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
  itempedido: Itempedido;
  clientes = [];
  produtos = [];
  itemIndex: number;
  pedidoTotal = 0;

  constructor(private route: ActivatedRoute,
    private pedidosService: PedidosService,
    private clientesService: ClientesService,
    private produtosService: ProdutosService,
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
    this.itempedido = new Itempedido();
    this.itemIndex = this.pedido.itens.length;
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

  filtrarProdutos(event) {
    const nome = event.query;
    this.produtosService.filtrarProdutos(nome).then(produtos => {
      this.produtos = produtos;
    })
  }
  
  atribuirValorUnitario(){
	this.itempedido.valorunitario = this.itempedido.produto.preco;
  }
  
  calcularTotalPedido(){
	  this.pedidoTotal = 0;
	  
	  for(let i = 0; i < this.pedido.itens.length; i++){
		  this.pedidoTotal += this.pedido.itens[i].totalitem;
	  }
	  this.pedido.valorpedido = this.pedidoTotal;
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

  clonarItem(itemPedido: Itempedido): Itempedido {
    return new Itempedido(itemPedido.id, itemPedido.produto, itemPedido.qtdeitem, itemPedido.valorunitario, itemPedido.totalitem);
  }

  confirmarItem(form: FormControl) {
    this.pedido.itens[this.itemIndex] = this.clonarItem(this.itempedido);
    this.calcularTotalPedido();
	this.prepararNovoItem();
  }

  prepararEdicaoItem(itemPedido: Itempedido, index: number) {
    this.itempedido = this.clonarItem(itemPedido);
    this.exibirFormularioItem = true;
    this.itemIndex = index;

  }
  
  removerItem(index:number){
	 this.pedido.itens.splice(index,1); 
	 this.calcularTotalPedido();
  }
  
  calcularTotalItem(){
	 this.itempedido.totalitem = this.itempedido.qtdeitem * this.itempedido.valorunitario; 
  }
}