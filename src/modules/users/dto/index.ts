import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ description: 'user name' })
  @IsString()
  name: string;
  @ApiProperty({ description: 'user email' })
  @IsString()
  email: string;
  @ApiProperty({ description: 'user password' })
  @IsString()
  password: string;
}

export class UpdateUserDTO {
  @ApiProperty({ description: 'user name' })
  @IsString()
  name: string;
  @ApiProperty({ description: 'user email' })
  @IsString()
  email: string;
}
