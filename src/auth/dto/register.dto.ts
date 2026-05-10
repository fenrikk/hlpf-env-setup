import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email користувача' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль (мін. 8 символів)', minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @ApiPropertyOptional({ example: 'John Doe', description: "Ім'я користувача" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}
