import { Pedido } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


export class PedidoFiltro {
  pagina = 0;
  itensPorPagina = 10;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private httpClient: HttpClient) { }

  pedidosUrl = 'http://localhost:8080/pedidos';

  pesquisar(filtro: PedidoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome)
    }

    return this.httpClient.get<any>(`${this.pedidosUrl}`, { params }).toPromise().then(response => {
      const pedidos = response.content;
      const resultado = {
        pedidos,
        total: response.totalElements
      }
      return resultado
    });
  }


  excluir(id: number): Promise<Pedido> {
    return this.httpClient.delete(`${this.pedidosUrl}/${id}`).toPromise().then(() => null);
  }
}
