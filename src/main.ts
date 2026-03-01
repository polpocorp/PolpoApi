import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev')); // Agrega Morgan para loggear peticiones
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
