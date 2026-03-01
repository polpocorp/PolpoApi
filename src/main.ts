import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  app.enableCors(); // Altamente recomendado para evitar bloqueos desde el frontend

  // En Vercel, necesitamos que la app se inicialice
  // pero el manejo del puerto es interno de la plataforma.
  await app.init();
}

// Es crucial que la función se ejecute para que Vercel cree la instancia
bootstrap();
