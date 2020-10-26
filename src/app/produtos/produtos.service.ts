import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Produto } from '../core/model';


export class ProdutoFiltro {
  pagina = 0;
  itensPorPagina = 10;
  nome: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) { }

  produtosUrl = 'http://localhost:8080/produtos';

  pesquisar(filtro: ProdutoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome)
    }
    return this.http.get<any>(`${this.produtosUrl}`, { params }).toPromise().then(response => {
      const produtos = response.content;
      const resultado = {
        produtos,
        total: response.totalElements
      }
      return resultado
    });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.produtosUrl}/${id}`).toPromise().then(() => null);
  }

  inserir(produto: Produto): Promise<Produto>{
    return this.http.post<Produto>(this.produtosUrl, produto).toPromise();
  }

  alterar(produto: Produto): Promise<Produto>{
    return this.http.put<Produto>(`${this.produtosUrl}/${produto.id}`, produto).toPromise().then(response =>{
      const produtoAlterado = response;
      return produtoAlterado;
    })
  }

  buscarPorId(id:number): Promise<Produto>{
    return this.http.get<Produto>(`${this.produtosUrl}/${id}`).toPromise().then(response =>{
      const produto = response;
      return produto;
    });

  }
  
  filtrarProdutos(nome:string): Promise<any>{
	  return this.http.get(`${this.produtosUrl}/produto/${nome}`).toPromise();
  }
}
