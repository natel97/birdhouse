const main = name => `import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const options = new DocumentBuilder()
    .setTitle('${name}')
    .setDescription(
      '${name}, created with BirdHouse!.',
    )
    .setVersion('1.0')
    .setSchemes('http', 'https')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();`;

module.exports = main;
