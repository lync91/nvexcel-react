import { NestFactory } from '@nestjs/core';
import * as fs from "fs";
import { AppModule } from './app.module';

const httpsOptions = {
  key: fs.readFileSync('../cert/server.key', 'utf8'),
  cert: fs.readFileSync('../cert/server.crt', 'utf8'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {httpsOptions});
  await app.listen(8083);
}
bootstrap();