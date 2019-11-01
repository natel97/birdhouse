const upper = word => word.charAt(0).toUpperCase() + word.slice(1);

const appModule = entities => `import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
${entities
  .map(
    name => `
import ${upper(name)}Entity from './${name}/${name}.entity'
import ${upper(name)}Module from './${name}/${name}.module'
`
  )
  .join("")}

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: ['src/**/*.entity.ts'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      ${entities
        .map(
          name => `${upper(name)}Entity,
      `
        )
        .join("")}
    ]),
    ${entities
      .map(
        name => `${upper(name)}Module,
    `
      )
      .join("")}
  ],
  controllers: [],
  providers: [
  ],
})
export default class AppModule {}`;

module.exports = appModule;
