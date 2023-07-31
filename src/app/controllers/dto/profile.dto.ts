import { IsNotEmpty, IsEnum } from 'class-validator';

export enum ProfileGender {
    MALE = 'M',
    FEMALE = 'F'
}

export class ProfileDto {
    @IsNotEmpty()
    bio!: string;
  
    @IsNotEmpty()
    dateOfBirth!: Date;
  
    @IsEnum(ProfileGender)
    gender!: ProfileGender;
}