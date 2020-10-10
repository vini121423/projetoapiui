import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosService } from '../pedidos.service';
import { ClientesService } from '../../clientes/clientes.service';
import { Pedido } from 'src/app/core/model';

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
			  private clientesService: ClientesService) { }

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
   
   if(idPedido){
	   this.carregarPedido(idPedido);
   }
}
 

  prepararNovoItem(){
	 this.exibirFormularioItem = true; 
  }
  
  closeForm(){
	 this.exibirFormularioItem = false; 
  }
  
  carregarPedido(id:number){
	this.pedidosService.buscarPorId(id).then(pedido => {
	   this.pedido = pedido;	
	})
  }
  
  carregarClientes(event){
	   const query = event.query;
	   this.clientesService.getClientes(query).then(clientes =>{
		   this.clientes = clientes;
	   })
  }
  
  get editando(){
	return Boolean(this.pedido.id);  
  }
}