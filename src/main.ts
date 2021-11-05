import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // If set to true validator will strip validated object of any properties that do not have any decorators.
      forbidNonWhitelisted: true, // entity 의 없는 값을 사전에 차단.
      transform: true, // req 값을 우리가 원하는 실제 타입으로 변경해줌. (e.g. id: string -> number)
    }),
  );

  const options = new DocumentBuilder()
  .setTitle('12-punch-assignment2-freshcode')
  .setDescription('board application')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
