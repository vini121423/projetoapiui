import { Pedido } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';


export class PedidoFiltro {
  pagina = 0;
  itensPorPagina = 10;
  nome: string;
  dataPedidoDe: Date;
  dataPedidoAte: Date;
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

    if (filtro.dataPedidoDe) {
      params = params.append('dataPedidoDe', moment(filtro.dataPedidoDe).format('YYYY/MM/DD'));
    }

    if (filtro.dataPedidoAte) {
      params = params.append('dataPedidoAte', moment(filtro.dataPedidoAte).format('YYYY/MM/DD'));
    }

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

  private converterStringParaData(pedidos: Pedido[]) {
    for (const pedido of pedidos) {
      if (pedido.datapedido) {
        pedido.datapedido = moment(pedido.datapedido, 'YYYY-MM-DD').toDate();
      }
    }
  }

  buscarPorId(id: Number): Promise<Pedido> {
    return this.httpClient.get<Pedido>(`${this.pedidosUrl}/${id}`).toPromise().then(response => {
      const pedido = response;
      return pedido;
    });
  }

  excluir(id: number): Promise<Pedido> {
    return this.httpClient.delete(`${this.pedidosUrl}/${id}`).toPromise().then(() => null);
  }

  adicionar(pedido: Pedido): Promise<Pedido> {
    return this.httpClient.post<Pedido>(this.pedidosUrl, pedido).toPromise();
  }

  atualizar(pedido: Pedido): Promise<Pedido> {
    return this.httpClient.put<Pedido>(`${this.pedidosUrl}/${pedido.id}`, pedido).toPromise().then(response => {
      const pedidoAlterado = response;
      return pedidoAlterado;
    })
  }

}
