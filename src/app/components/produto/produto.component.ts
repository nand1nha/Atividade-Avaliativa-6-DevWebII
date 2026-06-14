import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-produto',
  imports: [CommonModule, RouterLink],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css',
})
export class ProdutoComponent implements OnInit {
  produto: Produto | null = null;
  carregando = true;
  erro = '';

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.produtoService.buscarPorId(id)
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: (produto) => {
          this.produto = produto;
        },
        error: () => {
          this.erro = 'Nao foi possivel encontrar esse produto.';
          this.cd.detectChanges();
        }
      });
  }
}
