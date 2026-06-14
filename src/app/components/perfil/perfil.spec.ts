import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { UsuarioService } from '../../service/usuario.service';
import { Perfil } from './perfil';

const usuarioFake = {
  id: 2,
  email: 'teste@email.com',
  username: 'mor_2314',
  password: '83r5^_',
  phone: '123',
  __v: 0,
  name: {
    firstname: 'david',
    lastname: 'morrison'
  },
  address: {
    city: 'kilcoole',
    street: 'Lovers Ln',
    number: 7267,
    zipcode: '12926-3874',
    geolocation: {
      lat: '-37.3159',
      long: '81.1496'
    }
  }
};

describe('Perfil', () => {
  let component: Perfil;
  let fixture: ComponentFixture<Perfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perfil],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            isLogado: () => true,
            getToken: () => 'token-teste',
            logout: () => undefined
          }
        },
        {
          provide: UsuarioService,
          useValue: {
            buscarUsuarioLogado: () => of(usuarioFake)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Perfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
