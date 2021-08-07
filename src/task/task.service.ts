import { ConfigService } from '@nestjs/config'
import { HttpService, Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'
import { JobConfiguration } from './interfaces'

const defaultInterval = '* * * * * *'

@Injectable()
export class TaskService {
  private readonly postJobInterval: string
  private readonly patchJobInterval: string
  private readonly putJobInterval: string
  private readonly baseUrl: string

  private jobConfigurations: JobConfiguration[] = []

  constructor(
    private httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry,
    private configService: ConfigService,
  ) {
    this.postJobInterval = this.configService.get<string>('POST_JOB_INTERVAL', defaultInterval)
    this.patchJobInterval = this.configService.get<string>('PATCH_JOB_INTERVAL', defaultInterval)
    this.putJobInterval = this.configService.get<string>('PUT_JOB_INTERVAL', defaultInterval)
    this.baseUrl = this.configService.get<string>('BASE_URL', '')

    this.jobConfigurations = [
      {
        url: `${this.baseUrl}/post-job`,
        interval: this.postJobInterval,
        method: 'POST',
        dataFn: () => ({
          name: 'connie',
          msg: 'schedule dynamic post job every 15 second',
          timestamp: Date.now(),
        }),
        name: 'post-job2',
      },
      {
        url: `${this.baseUrl}/patch-job`,
        interval: this.patchJobInterval,
        method: 'PATCH',
        dataFn: () => ({
          name: 'mary',
          msg: 'schedule dynamic patch job every 20 second',
          timestamp: Date.now(),
        }),
        name: 'patch-job2',
      },
      {
        url: `${this.baseUrl}/put-job`,
        interval: this.putJobInterval,
        method: 'PUT',
        dataFn: () => ({
          name: 'job',
          msg: 'schedule dynamic put job every 30 second',
          timestamp: Date.now(),
        }),
        name: 'put-job2',
      },
    ]
  }

  // @Cron('*/15 * * * * *')
  // async handlePostJob(): Promise<void> {
  //   try {
  //     await this.httpService
  //       .post(`${this.baseUrl}/post-job`, {
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
  //       .patch(`${this.baseUrl}/patch-job`, {
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
  //       .put(`${this.baseUrl}/put-job`, {
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
          .post(`${this.baseUrl}/post-job`, {
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
          .patch(`${this.baseUrl}/patch-job`, {
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
          .put(`${this.baseUrl}/put-job`, {
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

  private callbackGenerator(configuration: JobConfiguration): () => Promise<void> {
    const { url, method, dataFn } = configuration
    return async () => {
      try {
        await this.httpService
          .request({
            url,
            method,
            data: dataFn(),
          })
          .toPromise()
      } catch (err) {
        console.error(err)
      }
    }
  }

  addConfigurableCronJobs(): void {
    for (const configuration of this.jobConfigurations) {
      const { interval, name } = configuration
      const callback = this.callbackGenerator(configuration)
      const cronjob = new CronJob(interval, callback)
      this.schedulerRegistry.addCronJob(name, cronjob)
      cronjob.start()
    }
  }
}
