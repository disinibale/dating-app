import { Request, Response, NextFunction } from 'express';
import { UserSwipeCreationAttributes } from '../../models/interfaces/userSwipe.interface';

import Profile from '../../models/profile.model';

import UserService from '../services/user.service';
import ProfileService from '../services/profile.service';
import UserSwipeService from '../services/userSwipe.service';

import NotFoundException from '../exceptions/clientException/notFound.exception';
import BadRequestException from '../exceptions/clientException/badRequest.exception';
import ConflictRequestException from '../exceptions/clientException/conflictRequest.exception';
import ForbiddenRequestException from '../exceptions/clientException/forbiddenRequest.exception';
import userSubscriptionsService from '../services/userSubscriptions.service';

export async function swipe(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = req.user
    const body = req.body as UserSwipeCreationAttributes
    const payload = { ...body, userId: user?.userId } as UserSwipeCreationAttributes
    try {
        const userPremiumAccess = await userSubscriptionsService.getPurchasedPackage(user?.userId as number)
        const userAlreadySwiped = await UserSwipeService.isAlreadySwiped(user?.userId as number, body.profileId)
        
        if (!userPremiumAccess.includes('hasUnlimitedSwipe')) {
            const swipedProfileIds = await UserSwipeService.getAllSwipedForToday(user?.userId as number)
            if (swipedProfileIds.length >= 10) throw new ForbiddenRequestException('You have reached 10 swipe for today')
        }
        if (userAlreadySwiped) throw new ConflictRequestException('This profile has already swiped today')
        
        const createdSwipe = await UserSwipeService.create(payload)

        res.status(201).json({
            message: 'Success',
            code: 201,
            data: createdSwipe
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export async function browsePotentialMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = req.user
    try {
        const authenticatedUser = await UserService.findById(user?.userId, { include: Profile })
        if (!authenticatedUser) throw new NotFoundException('User not found')
        if (!(authenticatedUser.profile.gender && authenticatedUser.profile.dateOfBirth)) throw new BadRequestException('User has not completed their profile')

        const swipedProfileIds = await UserSwipeService.getAllSwipedForToday(user?.userId as number)
        const mappedSwipedProfileIds = swipedProfileIds.map(swiped => swiped.profileId)
        const potentialMatch = await ProfileService.browsePotentialProfile(user?.userId as number, authenticatedUser.profile.gender, mappedSwipedProfileIds)

        res.status(200).json({
            message: `Showing total of ${potentialMatch.length} potential match`,
            code: 200,
            data: potentialMatch,
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export async function getMatchedProfiles() { }