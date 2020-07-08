import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cidade } from '../core/model';

export class CidadeFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable({
  providedIn: 'root'
})
export class CidadesService {

  constructor(private http: HttpClient) { }

  cidadesUrl = 'http://localhost:8080/cidades';

  pesquisar(filtro: CidadeFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.cidadesUrl}`, { params })
      .toPromise()
      .then(response => {
        const cidades = response.content;

        const resultado = {
          cidades,
          total: response.totalElements
        }
        return resultado;
      });
  }

  adicionar(cidade: Cidade): Promise<Cidade> {
    return this.http.post<Cidade>(this.cidadesUrl, cidade).toPromise();
  }

  atualizar(cidade: Cidade): Promise<Cidade> {
    return this.http.put<Cidade>(`${this.cidadesUrl}/${cidade.id}`, cidade).toPromise().then(response => {
      const cidadeAlterada = response;
      return cidadeAlterada;
    });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.cidadesUrl}/${id}`).toPromise().then(() => null);
  }

  bucarPorId(id: Number): Promise<Cidade>{
     return this.http.get<Cidade>(`${this.cidadesUrl}/${id}`).toPromise().then(response =>{
        const cidade = response;
        return cidade;
     });
 }

 listarTodasCidades(): Promise<Cidade[]>{
   return this.http.get<Cidade[]>(`${this.cidadesUrl}/todas`).toPromise();
 }
}
