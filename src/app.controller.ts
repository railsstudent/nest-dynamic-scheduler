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
    const { name, msg, timestamp } = job
    const date = new Date(timestamp)
    console.log(`post-job: ${name} sends ${msg} on ${date}`)
    return {
      name: 'post-job',
      success: true,
    }
  }

  @Patch('patch-job')
  patchJob(@Body() job: SimpleJob): SimpleJobResponse {
    const { name, msg, timestamp } = job
    const date = new Date(timestamp)
    console.log(`patch-job: ${name} sends ${msg} on ${date}`)
    return {
      name: 'patch-job',
      success: true,
    }
  }

  @Put('put-job')
  putchJob(@Body() job: SimpleJob): SimpleJobResponse {
    const { name, msg, timestamp } = job
    const date = new Date(timestamp)
    console.log(`put-job: ${name} sends ${msg} on ${date}`)
    return {
      name: 'put-job',
      success: true,
    }
  }
}
