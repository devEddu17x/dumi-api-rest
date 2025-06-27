import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('prenda')
export class Prenda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'nombre_prenda',
    nullable: false,
    length: 100,
  })
  nombrePrenda: string;

  @Column({
    nullable: false,
    type: 'text',
    length: undefined,
    comment: 'Descripción detallada de la prenda',
  })
  descripcion: string;

  @Column({
    name: 'diseño',
    nullable: true,
    type: 'longblob',
    comment: 'Datos binarios de la imagen del diseño de la prenda',
  })
  diseño: Buffer;

  @CreateDateColumn({
    name: 'fecha_creacion',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'fecha_actualizacion',
    type: 'timestamp',
  })
  updatedAt: Date;
}
