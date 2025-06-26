import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    unique: false,
    length: 50,
  })
  nombre: string;

  @Column({
    nullable: false,
    unique: false,
    length: 50,
  })
  apellido: string;

  @Column({
    nullable: false,
    unique: true,
    length: 50,
  })
  usuario: string;

  @Column({
    nullable: false,
    unique: false,
    length: 60,
  })
  contraseña: string;

  @CreateDateColumn({
    name: 'fecha_creacion',
    type: 'time with time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'fecha_actualizacion',
    type: 'time with time zone',
  })
  updatedAt: Date;
}
