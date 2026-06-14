import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUsuarios = 'https://fakestoreapi.com/users';

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUsuarios);
  }

  buscarUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUsuarios}/${id}`);
  }

  buscarUsuarioLogado(): Observable<Usuario | null> {
    const id = Number(localStorage.getItem('usuarioId'));

    if (!id) {
      return of(null);
    }

    return this.buscarUsuario(id);
  }
}
