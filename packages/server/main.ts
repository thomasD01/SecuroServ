import { NestFactory } from '@nestjs/core'
import * as morgan from 'morgan'
import * as Browserify from 'browserify'
import * as babel from '@babel/core'
import { writeFile } from 'fs/promises'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import '@babel/register'

import { AppModule } from './src/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({origin: '*'})

  if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'));
  }

  const bundleDir = join(__dirname, 'bundle');
  const clientFile = join(__dirname, 'src', 'client.tsx');
  const clientOutFile = join(bundleDir, 'client.js');
  const loginPageFile = join(__dirname, 'src', 'loginPage.tsx');
  const loginPageOutFile = join(bundleDir, 'loginPage.js');
  const bundleFile = join(__dirname, 'public', 'js', 'bundle.js')

  if(!existsSync(bundleDir)){
    mkdirSync(bundleDir);
  }

  await writeFile(clientOutFile,(await babel.transformFileAsync(clientFile))?.code!)
  await writeFile(loginPageOutFile,(await babel.transformFileAsync(loginPageFile))?.code!)

  Browserify()
  .add(clientOutFile)
  .require(loginPageOutFile)
  .bundle()
  .pipe(createWriteStream(bundleFile));

  await app.listen(3001);

}
bootstrap();
