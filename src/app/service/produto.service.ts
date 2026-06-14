import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';


@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiProdutos = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiProdutos);
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiProdutos}/${id}`);
  }
}
