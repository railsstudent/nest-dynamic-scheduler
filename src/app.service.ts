import { Injectable } from '@nestjs/common'
import { SimpleJob } from './dtos'
import { SimpleJobResponse } from './interfaces'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  printMessage(identifier: string, job: SimpleJob): SimpleJobResponse {
    const { name, msg, timestamp } = job
    const date = new Date(timestamp)
    console.log(`${identifier}: ${name} sends ${msg} on ${date}`)
    return {
      name: identifier,
      success: true,
    }
  }
}
