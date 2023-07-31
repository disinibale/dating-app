import { IsNotEmpty, IsInt } from 'class-validator';

export class PurchaseSubscription {

    @IsNotEmpty()
    @IsInt()
    premiumPackageId!: number

    @IsNotEmpty()
    @IsInt()
    price!: number
    
}