import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  private userAgent: string =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36';

  testURL(url) {
    url = url.trim();

    if (url.indexOf('http') !== 0) {
      url = 'http://' + url;
    }

    console.log('Beginning test of: ', url);
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        await page.setUserAgent(this.userAgent);

        let versaTags = [];

        page.on('request', this.appendMMDebug);

        page.on('response', async response => {
          let url = response.url();
          let queryString = url.substring(url.indexOf('?') + 1);

          if (url.indexOf('bs.serving-sys.com/Serving?cn=ot') > -1) {
            versaTags.push({
              url,
              queryString,
              ...this.parseBody(await response.text()),
            });
          }
        });

        let pageResponse = await page.goto(url, { waitUntil: 'networkidle2' });

        let finalURL = page.url();
        let pageStatus = pageResponse.status();
        let redirectChain = pageResponse
          .request()
          .redirectChain()
          .map(pageRequest => pageRequest.url());

        await browser.close();

        resolve({ finalURL, pageStatus, redirectChain, versaTags });
      } catch (error) {
        reject(error);
      }
    });
  }

  appendMMDebug(interceptedRequest) {
    let url = interceptedRequest.url();
    if (
      url.indexOf('bs.serving-sys.com/Serving') > -1 &&
      url.indexOf(`cn=ot`) > -1
    ) {
      interceptedRequest.continue({ url: url + '&mmdebug=1' });
    } else {
      interceptedRequest.continue();
    }
  }

  parseBody(body) {
    let ruleHits = body
      .split('\n')
      .find(line => line.indexOf('Rule hits:') > -1);

    let VersaTagIdRegex = /OneTagId:(\d*?),/;
    let RuleHitRegex = /Rule hits:(.*?),\s/;
    let ClientHitRegex = /Rule await client hit:(.*?),\s/;

    let [, versaTagId = ''] = VersaTagIdRegex.exec(ruleHits) || [];
    let [, mappingRules = ''] = RuleHitRegex.exec(ruleHits) || [];
    let [, awaitClientHit = ''] = ClientHitRegex.exec(ruleHits) || [];

    return { versaTagId, mappingRules, awaitClientHit };
  }
}
