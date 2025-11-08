import { IsString, IsEmail, Length } from 'class-validator';

export class CreateStudentDto {
  @IsString() name: string;
  @IsString() @Length(11, 14) cpf: string;
  @IsEmail() email: string;
}
