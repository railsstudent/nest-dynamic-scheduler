import { Method } from 'axios'

export interface JobConfiguration {
  url: string
  interval: string
  method: Method
  dataFn: () => any
  name: string
}
