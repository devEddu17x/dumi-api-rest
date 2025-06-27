import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUsuarioDto {
  @IsNotEmpty({ message: 'El usuario es obligatorio' })
  @IsString({ message: 'El usuario debe ser un texto' })
  @Length(3, 50, { message: 'El usuario debe tener entre 3 y 50 caracteres' })
  usuario: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @Length(1, 60, { message: 'La contraseña es requerida' })
  contraseña: string;
}
