import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  testURL(url) {
    return { url };
  }
}
