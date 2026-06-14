import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home')
      .then(c => c.Home),
    title: 'Produtos'
  },
  {
    path: 'produto/:id',
    loadComponent: () =>
      import('./components/produto/produto.component')
      .then(c => c.ProdutoComponent),
    title: 'Detalhe do produto'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login')
      .then(c => c.Login),
    title: 'Login'
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./components/perfil/perfil')
      .then(c => c.Perfil),
    title: 'Minha conta'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
