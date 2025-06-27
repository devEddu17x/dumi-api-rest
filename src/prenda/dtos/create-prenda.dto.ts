import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePrendaDto {
  @IsNotEmpty({ message: 'El nombre de la prenda es obligatorio' })
  @IsString({ message: 'El nombre de la prenda debe ser un texto' })
  @Length(2, 100, {
    message: 'El nombre de la prenda debe tener entre 2 y 100 caracteres',
  })
  nombrePrenda: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser un texto' })
  @Length(10, 1000, {
    message: 'La descripción debe tener entre 10 y 1000 caracteres',
  })
  descripcion: string;
}
