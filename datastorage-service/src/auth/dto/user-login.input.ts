import { IsEmail, IsString, Length } from 'class-validator';

export class UserLoginInput {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
