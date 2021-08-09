import { HttpModule, Module, OnModuleInit } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TaskService } from './task.service'

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  providers: [TaskService],
  controllers: [],
})
export class TaskModule implements OnModuleInit {
  constructor(private taskService: TaskService) {}

  async onModuleInit() {
    // await taskService.addCronJobs()
    await this.taskService.addConfigurableCronJobs()
  }

  async onModuleDestroy() {
    await this.taskService.deleteConfigurableCronJobs()
  }
}
