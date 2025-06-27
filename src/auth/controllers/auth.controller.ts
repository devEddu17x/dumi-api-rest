import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { AuthService } from '../services/auth.service';
import { LoginUsuarioDto } from '../dtos/login-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() usuario: CreateUsuarioDto) {
    try {
      const result = await this.authService.register(usuario);
      return {
        message: 'Usuario registrado correctamente',
        user: result,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  @Post('login')
  async login(@Body() usuario: LoginUsuarioDto) {
    const result = await this.authService.login(usuario);
    if (result == null) {
      throw new NotFoundException('Usuario no encontrado');
    } else if (result == false) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    return { message: 'Login exitoso' };
  }
}
