import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', (): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'dumi',
    database: 'dumi',
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV !== 'production',
  };
});
