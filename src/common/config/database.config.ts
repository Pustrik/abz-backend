import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { SeederOptions } from 'typeorm-extension';

ConfigModule.forRoot({});

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number.parseInt(DB_PORT) || 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [__dirname + '/./../../../dist/common/models/*.{ts,js}'],
  migrations: [__dirname + '/./../../../dist/common/migrations/*.{ts,js}'],
  synchronize: false,
  logging: 'all',
  logger: 'simple-console',
  migrationsTableName: 'migrations',
  seeds: [__dirname + '/./../../../dist/common/seeds/main.seeder.{ts,js}'],
  factories: [__dirname + '/./../../../dist/common/seeds/*.factory.{ts,js}'],
};

export default new DataSource(dataSourceOptions);
