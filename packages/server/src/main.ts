import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    
  app.use(morgan('short'));
  app.enableCors();

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
