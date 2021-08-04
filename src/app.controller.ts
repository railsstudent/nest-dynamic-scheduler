import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common'
import { AppService } from './app.service'
import { SimpleJob } from './dtos'
import { SimpleJobResponse } from './interfaces'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('post-job')
  postJob(@Body() job: SimpleJob): SimpleJobResponse {
    return this.appService.printMessage('post-job', job)
  }

  @Patch('patch-job')
  patchJob(@Body() job: SimpleJob): SimpleJobResponse {
    return this.appService.printMessage('patch-job', job)
  }

  @Put('put-job')
  putchJob(@Body() job: SimpleJob): SimpleJobResponse {
    return this.appService.printMessage('put-job', job)
  }
}
