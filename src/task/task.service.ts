import { HttpService, Injectable } from '@nestjs/common'
import { AxiosResponse } from 'axios'

@Injectable()
export class TaskService {
  constructor(private httpService: HttpService) {}

  findAll(): Promise<AxiosResponse<any>> {
    // return this.httpService.request({
    //   url: 'http://localhost:3000/post-job',
    //   method: 'POST',
    //   data: {
    //     name: 'Connie',
    //     msg: 'I am coding scheduler in NestJS',
    //     timestamp: Date.now(),
    //   },
    // })
    const result = this.httpService
      .patch('http://localhost:3000/patch-job', {
        name: 'connie',
        msg: 'patch job is working',
        timestamp: Date.now(),
      })
      .toPromise()
      .then((response) => response.data)
    return result
  }
}
