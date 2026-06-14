import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  carregando = false;
  erro = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  usarUsuarioTeste(): void {
    this.username = 'mor_2314';
    this.password = '83r5^_';
    this.erro = '';
  }

  entrar(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.erro = 'Preencha usuario e senha para continuar.';
      return;
    }

    this.carregando = true;
    this.erro = '';

    this.authService.login(this.username.trim(), this.password)
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/perfil']);
        },
        error: () => {
          this.erro = 'Usuario ou senha invalidos para a Fake Store API.';
          this.cd.detectChanges();
        }
      });
  }
}
