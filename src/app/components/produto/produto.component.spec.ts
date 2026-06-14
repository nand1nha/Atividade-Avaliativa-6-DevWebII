import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ProdutoService } from '../../service/produto.service';
import { ProdutoComponent } from './produto.component';

const produtoFake = {
  id: 1,
  title: 'Produto teste',
  price: 99,
  description: 'Descricao do produto',
  category: 'teste',
  image: 'https://example.com/produto.png',
  rating: {
    rate: 4,
    count: 10
  }
};

describe('ProdutoComponent', () => {
  let component: ProdutoComponent;
  let fixture: ComponentFixture<ProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            }
          }
        },
        {
          provide: ProdutoService,
          useValue: {
            buscarPorId: () => of(produtoFake)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
