import { IsEmail, IsOptional, IsString } from 'class-validator';

export class FindStudentsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
