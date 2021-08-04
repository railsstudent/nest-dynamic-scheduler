import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import * as Joi from 'joi'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TaskModule } from './task'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
        PORT: Joi.number().default(3001),
      }),
    }),
    ScheduleModule.forRoot(),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
