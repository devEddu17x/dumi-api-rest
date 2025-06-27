import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigurationModule } from './core/config/configuration.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsuarioModule, DatabaseModule, ConfigurationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
