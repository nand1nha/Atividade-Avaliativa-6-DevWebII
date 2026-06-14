import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Usuario } from '../models/usuario';
import { UsuarioService } from './usuario.service';

interface LoginResposta {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiLogin = 'https://fakestoreapi.com/auth/login';

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  login(username: string, password: string): Observable<Usuario> {
    return this.http.post<LoginResposta>(this.apiLogin, { username, password }).pipe(
      switchMap((resposta) =>
        this.usuarioService.listarUsuarios().pipe(
          map((usuarios) => {
            const usuario = usuarios.find((item) => item.username === username);

            if (!usuario) {
              throw new Error('Usuario nao encontrado.');
            }

            return {
              token: resposta.token,
              usuario
            };
          })
        )
      ),
      tap((dados) => this.salvarSessao(dados.token, dados.usuario)),
      map((dados) => dados.usuario)
    );
  }

  salvarSessao(token: string, usuario: Usuario): void {
    localStorage.setItem('token', token);
    localStorage.setItem('usuarioId', String(usuario.id));
    localStorage.setItem('usuarioNome', usuario.username);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLogado(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioNome');
  }
}
