import { Module } from '@nestjs/common';
import { PuppeteerModule } from './puppeteer/puppeteer.module';
import { CommandModule } from './command/command.module';

@Module({
  imports: [PuppeteerModule, CommandModule],
})
export class AppModule {}
