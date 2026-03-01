import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  app.enableCors({
    origin: '*', // En producción podrías poner solo la URL de tu web
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // En Vercel, necesitamos que la app se inicialice
  // pero el manejo del puerto es interno de la plataforma.
  await app.init();
}

// Es crucial que la función se ejecute para que Vercel cree la instancia
bootstrap();
