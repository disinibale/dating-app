import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    fullname!: string;
  
    @IsEmail()
    @IsNotEmpty()
    email!: string;
  
    @MinLength(6)
    @IsNotEmpty()
    password!: string;
}

export class SignInDto {  
    @IsEmail()
    @IsNotEmpty()
    email!: string;
  
    @MinLength(6)
    @IsNotEmpty()
    password!: string;
}