/* import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let app: any;

async function getApp() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    await app.init();
  }
  return app;
}

// Para Vercel (serverless)
export default async (req: any, res: any) => {
  const server = await getApp();
  const httpAdapter = server.getHttpAdapter().getInstance();
  httpAdapter(req, res);
};

// Para desarrollo local
async function bootstrap() {
  const localApp = await NestFactory.create(AppModule);
  await localApp.listen(process.env.PORT ?? 3000);
}

bootstrap();
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import morgan = require('morgan');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev')); // Agrega Morgan para loggear peticiones
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
