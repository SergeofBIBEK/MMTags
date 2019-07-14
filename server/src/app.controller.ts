import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post('testVersaTag')
  getHello(@Body() body) {
    return this.service.testURL(body.url);
  }
}
