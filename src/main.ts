import { NestFactory } from '@nestjs/core'
import helmet = require('helmet')
import * as compression from 'compression'
import * as morgan from 'morgan'
import * as cors from 'cors'
import * as express from 'express'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'

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

  // Starts listening for shutdown hooks
  app.enableShutdownHooks()

  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT', 0)
  await app.listen(port)
}
bootstrap()
  .then(() => console.log('Application started successfully'))
  .catch(console.error)
