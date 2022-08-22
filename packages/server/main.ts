import { NestFactory } from '@nestjs/core'
import * as morgan from 'morgan'
import * as Browserify from 'browserify'
import * as babel from '@babel/core'
import { writeFile } from 'fs/promises'
import { createWriteStream } from 'fs'
import { join } from 'path'
import { Readable } from 'stream'
import '@babel/register'

import { AppModule } from './src/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({origin: '*'});
  app.use(morgan('dev'));

  await writeFile(join(__dirname, 'bundle/client.js'),(await babel.transformFileAsync(join(__dirname, 'src/client.tsx')))?.code!)
  await writeFile(join(__dirname, 'bundle/loginPage.js'),(await babel.transformFileAsync(join(__dirname, 'src/loginPage.tsx')))?.code!)

  Browserify()
  .add(join(__dirname, 'bundle/client.js'))
  .require(join(__dirname, 'bundle/loginPage.js'))
  .bundle()
  .pipe(createWriteStream(join(__dirname, 'public/js/bundle.js')));

  await app.listen(3001);

}
bootstrap();
