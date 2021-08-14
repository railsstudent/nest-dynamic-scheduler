import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class SimpleJobDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @Min(0)
  timestamp: number

  @IsString()
  @IsNotEmpty()
  msg: string
}
