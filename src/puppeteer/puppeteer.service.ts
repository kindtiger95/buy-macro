import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PuppeteerService {
  private _browser: puppeteer.Browser;
  private _page: puppeteer.Page;

  public async init() {
    this._browser = await puppeteer.launch({
      headless: false,
    });
  }

  public async createNewPage() {
    let created_page: puppeteer.Page | undefined;
    try {
      created_page = await this._browser.newPage();
    } catch (error) {
      console.log('Creating new page error.');
    }
    if (!created_page) return false;
    this._page = created_page;

    await this._page.setViewport({
      width: 1280,
      height: 1440,
    });

    return true;
  }

  public async goToTheUrl(url: string) {
    if (!this._checkIsExistPage()) return false;
    await this._page.goto(url, {
      waitUntil: 'networkidle0',
    });
  }

  public async naverLogin() {
    if (!this._checkIsExistPage()) return false;
    await this.goToTheUrl('https://nid.naver.com/nidlogin.login');
  }

  public async gotoShop() {
    if (!this._checkIsExistPage()) return false;
    await this.goToTheUrl(process.env.STORE_URL);
  }

  public async isExistProduct() {
    let ret;
    try {
      ret = await this._page.$('._2-uvQuRWK5');
    } catch (error) {
      console.log('to fast...');
    }
    if (!ret) {
      console.log('reloading...');
      await this._page.reload({ waitUntil: 'load' });
      return false;
    }
    await this._page.waitForSelector('#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div.XqRGHcrncz > div:nth-child(1)');
    await this._page.click('#content > div > div._2-I30XS1lA > div._2QCa6wHHPy > fieldset > div.XqRGHcrncz > div:nth-child(1)');
    return true;
  }

  public async paymentProcess() {
    await this._page.waitForSelector(
      '#orderForm > div > div.discount_wrap > div.discount_info.discountPriceInfo > ul.list_discount.type_point._naverPointArea > li:nth-child(2) > div.area_item > button',
    );
    await this._page.click(
      '#orderForm > div > div.discount_wrap > div.discount_info.discountPriceInfo > ul.list_discount.type_point._naverPointArea > li:nth-child(2) > div.area_item > button',
    );
    await this._page.waitForSelector('#orderForm > div > div.payment_agree_wrap > button');
    await this._page.click('#orderForm > div > div.payment_agree_wrap > button');
  }

  /********************************** Private Function **********************************/
  private _checkIsExistPage(): boolean {
    if (!this._page) {
      console.log('Is not exist page.');
      return false;
    }
    return true;
  }
}
