import { Module } from '@nestjs/common';
import { PrendaService } from './services/prenda.service';
import { PrendaController } from './controllers/prenda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prenda } from './entities/prenda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prenda])],
  providers: [PrendaService],
  controllers: [PrendaController],
})
export class PrendaModule {}
