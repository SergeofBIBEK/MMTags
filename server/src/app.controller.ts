import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post('testVersaTag')
  async getHello(@Body() body) {
    let results = await this.service.testURL(body.url);
    let attempts = 0;

    while (this.checkForBadVTResponse(results) && attempts < 10) {
      console.log(
        `Weird VT Response Error Happened for ${body.url}, attempt #${attempts +
          1}`,
      );
      console.log('Retrying...');
      results = await this.service.testURL(body.url);
      attempts++;
    }

    return results;
  }

  checkForBadVTResponse(results) {
    return results.versaTags.reduce((error, vt) => {
      if (!vt.versaTagId || error) {
        return true;
      }
      return false;
    }, false);
  }
}
