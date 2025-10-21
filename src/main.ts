import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from 'src/http-exception/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  const config = new DocumentBuilder()
    .setTitle('API de Pagamentos - Desafio Técnico')
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

  if (process.env.NODE_ENV === 'test') {
    app.useLogger(false);
  }

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port);

  logger.log(`Server running on port ${await app.getUrl()}`);
}
void bootstrap();
