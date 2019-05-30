import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';
import * as moment from 'moment';

@Controller()
export class AppController {
  @Get()
  public async index(): Promise<string> {
    return 'Hello friend Good Luck To You!' ;
  }
  @Post('webhook')
  public async webhook(@Res() res, @Body() body): Promise<any> {
    return res.status(HttpStatus.OK).send('SUCCESS');
  }
}
