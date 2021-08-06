import { NestFactory } from '@nestjs/core'
import helmet = require('helmet')
import * as compression from 'compression'
import * as morgan from 'morgan'
import * as cors from 'cors'
import * as express from 'express'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { TaskService } from './task/task.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(compression())
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(morgan('dev'))
  app.use(helmet())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )

  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT', 0)
  await app.listen(port)

  const taskService = app.get(TaskService)
  // await taskService.addCronJobs()
  await taskService.addConfigurableCronJobs()
}
bootstrap()
  .then(() => console.log('Application started successfully'))
  .catch(console.error)
