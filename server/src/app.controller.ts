import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post('testVersaTag')
  async getHello(@Body() body) {
    let results = await this.service.testURL(body.url);
    let { versaTags } = results as any;

    let error = versaTags.reduce((error, vt) => {
      if (!vt.versaTagId || error) {
        return true;
      }
      return false;
    }, false);

    //Retry if error
    if (error) {
      console.log(`Weird VT Response Error Happened for ${body.url}`);
      console.log('Retrying...');
      results = await this.service.testURL(body.url);
    }

    return results;
  }
}
