import { Injectable } from '@nestjs/common';
import { PuppeteerService } from 'src/puppeteer/puppeteer.service';
import { question } from 'readline-sync';

@Injectable()
export class CommandService {
  private _isInit = false;

  constructor(private readonly _puppeteerService: PuppeteerService) {}

  async createBrowser() {
    if (this._isInit === false) {
      await this._puppeteerService.init();
      this._isInit = true;
    }
    await this._puppeteerService.createNewPage();
  }

  async naverLogin() {
    await this._puppeteerService.naverLogin();
  }

  async readLine() {
    question('please enter any key after login...');
    return true;
  }

  async goToShop() {
    await this._puppeteerService.gotoShop();
  }

  async shopingProcess() {
    while (true) {
      if (await this._puppeteerService.isExistProduct()) break;
    }
    await this._puppeteerService.paymentProcess();
  }
}
