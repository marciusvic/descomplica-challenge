import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('API Descomplica')
    .setDescription(
      'Documentação da API Descomplica, um sistema gerenciar alunos.',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Localhost')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Application running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(`Swagger docs: http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();
