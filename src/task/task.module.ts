import { HttpModule, Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TaskService } from './task.service'

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  providers: [TaskService],
  controllers: [],
})
export class TaskModule {}
