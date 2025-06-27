import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Prenda } from '../entities/prenda.entity';
import { CreatePrendaDto } from '../dtos/create-prenda.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PrendaService {
  constructor(
    @InjectRepository(Prenda)
    private readonly prendaRepository: Repository<Prenda>,
  ) {}

  async crearPrenda(
    prenda: CreatePrendaDto,
    file: Express.Multer.File,
  ): Promise<Prenda> {
    const nuevaPrenda = this.prendaRepository.create(prenda);
    nuevaPrenda.diseño = file ? file.buffer : null;
    return this.prendaRepository.save(nuevaPrenda);
  }

  async actualizarPrenda(
    updatePrendaDto: CreatePrendaDto,
    id: string,
  ): Promise<Prenda> {
    const prenda = await this.prendaRepository.findOneBy({ id });
    if (!prenda) {
      return null;
    }
    this.prendaRepository.merge(prenda, updatePrendaDto);
    return this.prendaRepository.save(prenda);
  }

  async consultarPrendas(): Promise<Prenda[]> {
    return this.prendaRepository.find();
  }
  async consultarPrendasNombre(nombre: string): Promise<Prenda[]> {
    return this.prendaRepository.find({
      where: { nombrePrenda: Like(`%${nombre}%`) },
    });
  }

  async consultarPrendaPorId(id: string): Promise<Prenda> {
    const prenda = await this.prendaRepository.findOneBy({ id });
    if (!prenda) {
      return null;
    }
    return prenda;
  }
}
