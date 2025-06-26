import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioController } from './controllers/usuario/usuario.controller';
import { CoreModule } from './core/core.module';

@Module({
  imports: [ClienteModule, UsuarioModule, CoreModule],
  controllers: [AppController, UsuarioController],
  providers: [AppService],
})
export class AppModule {}
