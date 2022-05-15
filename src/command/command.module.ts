import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';
import { CommandService } from './command.service';

@Module({
  imports: [PuppeteerModule],
  providers: [CommandService],
})
export class CommandModule {}
