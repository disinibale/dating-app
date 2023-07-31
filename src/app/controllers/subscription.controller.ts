import { Request, Response, NextFunction } from 'express';

import { UserSubscriptionsCreationAttributes } from '../../models/interfaces/userSubscriptions.interface';
import { PurchaseSubscription } from './dto/subscription.dto';

import premiumPackageService from '../services/premiumPackage.service';
import userSubscriptionsService from '../services/userSubscriptions.service';

import NotFoundException from '../exceptions/clientException/notFound.exception';
import BadRequestException from '../exceptions/clientException/badRequest.exception';
import ConflictRequestException from '../exceptions/clientException/conflictRequest.exception';

export async function getAllPremiumPackage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const premiumPackages = await premiumPackageService.findAll()

        res.status(200).json({
            message: 'Success',
            code: 200,
            data: premiumPackages
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export async function purchasePremiumPackage(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = req.user
    const { premiumPackageId, price }: PurchaseSubscription = req.body
    try {

        const packageExist = await premiumPackageService.findById(premiumPackageId)
        if (!packageExist) throw new NotFoundException('Premium Package not exist!')

        const userHasSelectedPackage = await userSubscriptionsService.findOne({ where: { premiumPackageId } })
        if (userHasSelectedPackage) throw new ConflictRequestException('User has bought this Premium Packages')

        const packagePrice = packageExist.price.toString().split('.')[0]
        if (price.toString() !== packagePrice) throw new BadRequestException('Request price is incorrect')
        
        const purchasedPackage = await userSubscriptionsService.create({ userId: user?.userId as number, premiumPackageId } as UserSubscriptionsCreationAttributes)

        res.status(201).send({
            message: 'Package purchased',
            code: 201,
            data: purchasedPackage
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}