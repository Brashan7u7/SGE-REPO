import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ClsService } from 'nestjs-cls';
import { MovimientoSubscriber } from './movimientos/movimiento.subscriber';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true, 
    }),
  );

  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
 

  const dataSource = app.get(DataSource);
  const cls = app.get(ClsService);

  MovimientoSubscriber.setClsService(cls);
  dataSource.subscribers.push(app.get(MovimientoSubscriber));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
