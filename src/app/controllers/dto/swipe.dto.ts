import { IsBoolean, IsNotEmpty, IsInt} from 'class-validator';

export class SwipeDto {
    
    @IsNotEmpty()
    @IsBoolean()
    isLiked!: boolean
    
    @IsNotEmpty()
    @IsInt()
    profileId!: number

}