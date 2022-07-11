import { IsEmail, IsString, Length } from 'class-validator';

export class UserRegisterInput {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsString()
  @Length(6, 40)
  fullname: string;
}
