import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  categorias: string[] = [];
  termoBusca = '';
  categoriaEscolhida = 'todas';
  carregando = true;
  erro = '';

  constructor(
    private produtoService: ProdutoService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.produtoService.listarProdutos()
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: (produtos) => {
          this.produtos = produtos;
          this.categorias = [...new Set(produtos.map((produto) => produto.category))];
          this.filtrarProdutos();
        },
        error: () => {
          this.erro = 'Nao foi possivel carregar os produtos da loja.';
          this.cd.detectChanges();
        }
      });
  }

  filtrarProdutos(): void {
    const busca = this.termoBusca.trim().toLowerCase();

    this.produtosFiltrados = this.produtos.filter((produto) => {
      const achouCategoria =
        this.categoriaEscolhida === 'todas' || produto.category === this.categoriaEscolhida;

      const achouBusca =
        !busca ||
        produto.title.toLowerCase().includes(busca) ||
        produto.description.toLowerCase().includes(busca) ||
        produto.category.toLowerCase().includes(busca);

      return achouCategoria && achouBusca;
    });
  }

  limparFiltros(): void {
    this.termoBusca = '';
    this.categoriaEscolhida = 'todas';
    this.filtrarProdutos();
  }

  trackByProduto(_index: number, produto: Produto): number {
    return produto.id;
  }
}
