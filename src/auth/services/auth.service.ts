import { UsuarioService } from 'src/usuario/services/usuario.service';
import { LoginUsuarioDto } from '../dtos/login-usuario.dto';
import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usuarioService: UsuarioService) {}
  async login(usuario: LoginUsuarioDto) {
    const resultadoLogin =
      await this.usuarioService.validarCredenciales(usuario);
    return resultadoLogin;
  }

  async register(usuario: CreateUsuarioDto) {
    const resultadoRegistro = await this.usuarioService.create(usuario);
    return resultadoRegistro;
  }
}
