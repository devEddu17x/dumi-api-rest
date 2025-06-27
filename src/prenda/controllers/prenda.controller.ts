import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PrendaService } from '../services/prenda.service';
import { CreatePrendaDto } from '../dtos/create-prenda.dto';
import { Prenda } from '../entities/prenda.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('prenda')
export class PrendaController {
  constructor(private readonly prendaService: PrendaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async crearPrenda(
    @Body() createPrendaDto: CreatePrendaDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ message: string; imagenReferencia: string }> {
    try {
      console.log('Archivo recibido:', file);
      const result = await this.prendaService.crearPrenda(
        createPrendaDto,
        file,
      );

      if (!result) {
        throw new BadRequestException('Error al crear la prenda');
      }

      return {
        message: 'Prenda creada correctamente',
        imagenReferencia: result.diseño
          ? 'Subida correctamente'
          : 'No se subió imagen',
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la prenda');
    }
  }
  @Patch(':id')
  async actualizarPrenda(
    @Body() updatePrendaDto: CreatePrendaDto,
    @Param('id', new ParseUUIDPipe()) uuid: string,
  ): Promise<{ message: string; prenda: Prenda }> {
    const result = await this.prendaService.actualizarPrenda(
      updatePrendaDto,
      uuid,
    );

    if (!result) {
      throw new NotFoundException('Prenda no encontrada');
    }
    return {
      message: 'Prenda actualizada correctamente',
      prenda: result,
    };
  }
  @Get()
  async consultarPrendaId(
    @Query('nombre') nombrePrenda: string,
  ): Promise<Prenda[]> {
    try {
      return await this.prendaService.consultarPrendasNombre(nombrePrenda);
    } catch (error) {
      throw new NotFoundException('Error al consultar las prendas');
    }
  }

  @Get(':id')
  async consultarPrendaPorId(id: string): Promise<Prenda> {
    const prenda = await this.prendaService.consultarPrendaPorId(id);
    if (!prenda) throw new NotFoundException('Error al consultar la prenda');
    return prenda;
  }
}
