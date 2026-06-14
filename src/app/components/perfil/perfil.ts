import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../service/auth.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  usuario: Usuario | null = null;
  carregando = true;
  erro = '';

  constructor(
    private usuarioService: UsuarioService,
    public authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLogado()) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioService.buscarUsuarioLogado()
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: (usuario) => {
          if (!usuario) {
            this.router.navigate(['/login']);
            return;
          }

          this.usuario = usuario;
        },
        error: () => {
          this.erro = 'Nao foi possivel carregar os dados do usuario.';
          this.cd.detectChanges();
        }
      });
  }

  nomeCompleto(): string {
    if (!this.usuario) {
      return '';
    }

    return `${this.usuario.name.firstname} ${this.usuario.name.lastname}`;
  }

  sair(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
