import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { CommandModule } from './command/command.module';
import { CommandService } from './command/command.service';

dotenv.config({
  path: './config/dev.env',
});

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const commandService = app.select(CommandModule).get(CommandService, { strict: true });
  await commandService.createBrowser();
  await commandService.naverLogin();
  await commandService.readLine();
  await commandService.goToShop();
  await commandService.shopingProcess();
}
bootstrap();
