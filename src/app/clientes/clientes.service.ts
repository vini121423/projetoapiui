import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


export class ClienteFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }
  clientesUrl = 'http://localhost:8080/clientes';

  pesquisar(filtro: ClienteFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });
    if (filtro.nome) {
      params = params.append('nome', filtro.nome)
    }
    return this.http.get<any>(`${this.clientesUrl}`, { params }).toPromise().
      then(response => {
        const clientes = response.content;
        const resultado = {
          clientes,
          total: response.totalElements
        }
        return resultado;
      });
  }

  excluir(id:number): Promise<void> {
    return this.http.delete(`${this.clientesUrl}/${id}`).toPromise().then(() => null);
  }
}
