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
      width: 1920,
      height: 1080,
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
    await this._page.waitForNavigation();
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
  /*     if (!this._checkIsExistPage()) return false;
    await this.goToTheUrl('https://smartstore.naver.com/mandymarket_/products/6485489215');

    // await this._page.type('#id', process.env.NAVER_ID);
    // await this._page.type('#pw', process.env.NAVER_PW);
    const elements = await this._page.$x('//*[@id="content"]/div/div[2]/div[2]/fieldset/div[7]/div[1]/div');
    await elements[0].click();
    await this._page.waitForNavigation(); */
  public async test(url: string) {
    /* const products_list = await ref_Page.$x('//*[@id="pc-wholeProductWidget"]/div/div/div/ul/li');
    const datas = [];
    for (let i = 0; i < products_list.length; i++) {
      const data: { [key in string]: any } = {};

      data.text = await ref_Page.evaluate((el) => {
        const text: string = el.textContent;
        return text.replace(/(\t|\n|\s)+/g, ''); // html 코드를 그대로 가져오기 때문에 공백을 전부 제거합니다.
      }, products_list[i]);

      const link = await products_list[i].$('a'); // 각 li 안에 있는 a를 가져옵니다.

      data.link = await ref_Page.evaluate((el) => {
        return el.href; // 해당 태그의 속성도 가져올 수 있습니다.
      }, link);

      datas.push(data);
    }

    console.log(datas); */
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
