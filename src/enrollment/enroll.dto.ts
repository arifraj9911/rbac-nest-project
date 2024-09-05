import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EnrollDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  passcode: string;
}
