import { TaskService } from './task.service'
import { Controller, Post } from '@nestjs/common'
import { AxiosResponse } from 'axios'

@Controller('task')
export class TaskController {
  constructor(private service: TaskService) {}

  @Post()
  sendPostJob(): Promise<AxiosResponse<any>> {
    return this.service.findAll()
  }
}
