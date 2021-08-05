import { HttpService, Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class TaskService {
  constructor(private httpService: HttpService) {}

  @Cron('*/15 * * * * *')
  async handlePostJob(): Promise<void> {
    await this.httpService
      .post('http://localhost:3000/post-job', {
        name: 'connie',
        msg: 'schedule post job every 5 second',
        timestamp: Date.now(),
      })
      .toPromise()
  }

  @Cron('*/20 * * * * *')
  async handlePatchJob(): Promise<void> {
    await this.httpService
      .patch('http://localhost:3000/patch-job', {
        name: 'connie',
        msg: 'schedule patch job every 10 second',
        timestamp: Date.now(),
      })
      .toPromise()
  }

  @Cron('*/30 * * * * *')
  async handlePutJob(): Promise<void> {
    await this.httpService
      .put('http://localhost:3000/put-job', {
        name: 'connie',
        msg: 'schedule put job every 15 second',
        timestamp: Date.now(),
      })
      .toPromise()
  }
}
