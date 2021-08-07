import { Body, Controller, Patch, Post, Put } from '@nestjs/common'
import { AppService } from './app.service'
import { SimpleJob } from './dtos'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('post-job')
  postJob(@Body() job: SimpleJob): void {
    this.appService.printMessage('post-job', job)
  }

  @Patch('patch-job')
  patchJob(@Body() job: SimpleJob): void {
    this.appService.printMessage('patch-job', job)
  }

  @Put('put-job')
  putchJob(@Body() job: SimpleJob): void {
    this.appService.printMessage('put-job', job)
  }
}
