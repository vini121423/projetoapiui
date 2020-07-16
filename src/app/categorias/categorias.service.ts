import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Categoria } from '../core/model';


export class CategoriaFiltro {
  pagina = 0;
  itensPorPagina = 10;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  categoriasUrl = 'http://localhost:8080/categorias';

  pesquisar(filtro: CategoriaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome)
    }

    return this.http.get<any>(`${this.categoriasUrl}`, { params }).toPromise().then(response => {
      const categorias = response.content;
      const resultado = {
        categorias,
        total: response.totalElements
      }
      return resultado;
    });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.categoriasUrl}/${id}`).toPromise().then(() => null);
  }

  adicionar(categoria: Categoria): Promise<Categoria> {
    return this.http.post<Categoria>(this.categoriasUrl, categoria).toPromise();
  }

  alterar(categoria: Categoria): Promise<Categoria> {
    return this.http.put<Categoria>(`${this.categoriasUrl}/${categoria.id}`, categoria).toPromise().then(response => {
      const categoriaAlterada = response;
      return categoriaAlterada;
    })
  }

  buscarPorId(id: number): Promise<Categoria> {
    return this.http.get<Categoria>(`${this.categoriasUrl}/${id}`).toPromise().then(response => {
      const categoria = response;
      return categoria;
    });
  }

  litarTodasCategorias(): Promise<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.categoriasUrl}/todas`).toPromise();
  } 
}