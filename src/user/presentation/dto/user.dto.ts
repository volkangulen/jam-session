import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserRegisterRequest extends UserLoginRequest {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  role: string;
}
