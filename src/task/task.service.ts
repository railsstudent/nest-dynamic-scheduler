import { ConfigService } from '@nestjs/config'
import { HttpService, Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'

const defaultInterval = '* * * * * *'

@Injectable()
export class TaskService {
  private readonly postJobInterval: string
  private readonly patchJobInterval: string
  private readonly putJobInterval: string

  constructor(
    private httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry,
    private configService: ConfigService,
  ) {
    this.postJobInterval = this.configService.get<string>('POST_JOB_INTERVAL', defaultInterval)
    this.patchJobInterval = this.configService.get<string>('PATCH_JOB_INTERVAL', defaultInterval)
    this.putJobInterval = this.configService.get<string>('PUT_JOB_INTERVAL', defaultInterval)
  }

  // @Cron('*/15 * * * * *')
  // async handlePostJob(): Promise<void> {
  //   try {
  //     await this.httpService
  //       .post('http://localhost:3000/post-job', {
  //         name: 'connie',
  //         msg: 'schedule post job every 15 second',
  //         timestamp: Date.now(),
  //       })
  //       .toPromise()
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  // @Cron('*/20 * * * * *')
  // async handlePatchJob(): Promise<void> {
  //   try {
  //     await this.httpService
  //       .patch('http://localhost:3000/patch-job', {
  //         name: 'connie',
  //         msg: 'schedule patch job every 20 second',
  //         timestamp: Date.now(),
  //       })
  //       .toPromise()
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  // @Cron('*/30 * * * * *')
  // async handlePutJob(): Promise<void> {
  //   try {
  //     await this.httpService
  //       .put('http://localhost:3000/put-job', {
  //         name: 'connie',
  //         msg: 'schedule put job every 30 second',
  //         timestamp: Date.now(),
  //       })
  //       .toPromise()
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  addCronJobs(): void {
    const postJob = new CronJob(this.postJobInterval, async () => {
      try {
        await this.httpService
          .post('http://localhost:3000/post-job', {
            name: 'connie',
            msg: 'schedule post job every 15 second',
            timestamp: Date.now(),
          })
          .toPromise()
      } catch (err) {
        console.error(err)
      }
    })

    const patchJob = new CronJob(this.patchJobInterval, async () => {
      try {
        await this.httpService
          .patch('http://localhost:3000/patch-job', {
            name: 'connie',
            msg: 'schedule patch job every 20 second',
            timestamp: Date.now(),
          })
          .toPromise()
      } catch (err) {
        console.error(err)
      }
    })

    const putJob = new CronJob(this.putJobInterval, async () => {
      try {
        await this.httpService
          .put('http://localhost:3000/put-job', {
            name: 'connie',
            msg: 'schedule put job every 30 second',
            timestamp: Date.now(),
          })
          .toPromise()
      } catch (err) {
        console.error(err)
      }
    })

    this.schedulerRegistry.addCronJob('post-job', postJob)
    this.schedulerRegistry.addCronJob('patch-job', patchJob)
    this.schedulerRegistry.addCronJob('put-job', putJob)
    postJob.start()
    patchJob.start()
    putJob.start()
  }
}
