import { Injectable } from '@nestjs/common'
import { SimpleJob } from './dtos'

@Injectable()
export class AppService {
  printMessage(identifier: string, job: SimpleJob): void {
    const { name, msg, timestamp } = job
    const date = new Date(timestamp)
    console.log(`${identifier}: ${name} sends ${msg} on ${date.toISOString()}`)
  }
}
