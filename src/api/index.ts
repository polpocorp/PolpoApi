import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module'; // Ajusta el path si es necesario
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as morgan from 'morgan';

const server = express();
let cachedApp; // Cache para evitar reinicializar en cada cold start

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.use(morgan('dev')); // Logging
    app.enableCors({
      origin: '*', // Cambia a tu frontend en producción
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
    await app.init();
    cachedApp = app;
  }
  return server;
}

// Este es el handler que Vercel invoca
export default async function handler(req: any, res: any) {
  const app = await bootstrap();
  app(req, res);
}
