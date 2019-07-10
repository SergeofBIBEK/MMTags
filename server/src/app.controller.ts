import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post('test')
  getHello(@Body() body) {
    return this.service.testURL(body.url);
  }
}
