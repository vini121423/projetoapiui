import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cliente } from '../core/model';



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

  adicionar(cliente: Cliente): Promise<Cliente> {
    return this.http.post<Cliente>(this.clientesUrl, cliente).toPromise();
  }

  atualizar(cliente: Cliente): Promise<Cliente> {
    return this.http.put<Cliente>(`${this.clientesUrl}/${cliente.id}`, cliente).toPromise().then(response => {
      const clienteAlterado = response;
      return clienteAlterado;
    });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.clientesUrl}/${id}`).toPromise().then(() => null);
  }

  bucarPorId(id: Number): Promise<Cliente>{
    return this.http.get<Cliente>(`${this.clientesUrl}/${id}`).toPromise().then(response =>{
       const cliente = response;
       return cliente;
    });
}

   getClientes(nome:string):Promise<any>{
	   return this.http.get(`${this.clientesUrl}/cli/${nome}`).toPromise();
   }

}
