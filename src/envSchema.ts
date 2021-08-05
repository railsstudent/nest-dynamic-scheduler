import * as Joi from 'joi'

const DEFAULT_JOB_INTERVAL = '* * * * * *'

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
  PORT: Joi.number().default(3001),
  POST_JOB_INTERVAL: Joi.string().default(DEFAULT_JOB_INTERVAL),
  PATCH_JOB_INTERVAL: Joi.string().default(DEFAULT_JOB_INTERVAL),
  PUT_JOB_INTERVAL: Joi.string().default(DEFAULT_JOB_INTERVAL),
  BASE_URL: Joi.string().required()
})
