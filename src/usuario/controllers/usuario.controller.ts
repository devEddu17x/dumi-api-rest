import { Controller, Delete, Param } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.usuarioService.delete(id);
  }
}
