import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from 'src/auth/dtos/create-usuario.dto';
import { LoginUsuarioDto } from 'src/auth/dtos/login-usuario.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(usuario: CreateUsuarioDto): Promise<Usuario> {
    usuario.contraseña = await bcrypt.hash(usuario.contraseña, 5);
    return this.usuarioRepository.save(usuario);
  }
  async delete(id: string): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      return null;
    }
  }
  async validarCredenciales(usuario: LoginUsuarioDto) {
    const user = await this.usuarioRepository.findOne({
      where: {
        usuario: usuario.usuario,
      },
    });

    if (!user) {
      return null;
    }

    const validCredentials = await bcrypt.compare(
      usuario.contraseña,
      user.contraseña,
    );

    if (!validCredentials) {
      return false;
    }
    return true;
  }
}
