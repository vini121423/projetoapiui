import { Component, OnInit } from '@angular/core';
import { ClienteFiltro, ClientesService } from '../clientes.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-clientes-pesquisa',
  templateUrl: './clientes-pesquisa.component.html',
  styleUrls: ['./clientes-pesquisa.component.css']
})
export class ClientesPesquisaComponent implements OnInit {

    totalRegistros = 0;
    filtro = new ClienteFiltro();
    clientes = [];

  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;

    this.clientesService.pesquisar(this.filtro).then(resultado=>{
        this.totalRegistros = resultado.total;
        this.clientes = resultado.clientes;
    });
  }

  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
  

}
