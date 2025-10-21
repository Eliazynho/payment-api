import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Pagamentos - Desafio TécnicoI')
    .setDescription(
      'Documentação da API RESTful para um sistema de pagamentos simplificado.',
    )
    .setVersion('1.0')
    .addTag('customers', 'Operações relacionadas aos clientes.')
    .addTag('charges', 'Operações relacionadas a cobranças.')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
