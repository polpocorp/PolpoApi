import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../app.module';
import express from 'express'; // Cambio clave: importación por defecto

const server = express(); // Ahora sí es "callable"

export const createVercelServer = async (expressInstance: any) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  await app.init();
  return app;
};

export default async (req: any, res: any) => {
  await createVercelServer(server);
  server(req, res);
};
