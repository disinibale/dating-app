
import { Router, Request, Response} from "express";
import { faker } from '@faker-js/faker'
import bcrypct from 'bcrypt'

import { UserCreationAttributes } from '../../models/interfaces/user.interface';
import { ProfileCreationAttributes } from "../../models/interfaces/profile.interface";
import userService from "../services/user.service";
import profileService from "../services/profile.service";
import { PremiumPackageCreationAttributes } from "../../models/interfaces/premiumPackage.interface";
import premiumPackageService from "../services/premiumPackage.service";

const router = Router()

router.get('/', async (req: Request, res: Response): Promise<void> => {
    // Seed Database
    try {
        // Seed User and Profile table
        for (let i = 0; i < 50; i++) {
            let userValues
            if (i === 0) {
                userValues = {
                    email: 'bale@mail.com',
                    fullname: 'Bale',
                    password: await bcrypct.hash('password', 10)
                } as UserCreationAttributes
            } else {
                userValues = {
                    email: faker.internet.email(),
                    fullname: faker.person.fullName(),
                    password: await bcrypct.hash('password', 10)
                } as UserCreationAttributes
            }

            const profileValues = {
                bio: faker.music.songName(),
                dateOfBirth: faker.date.between({ from: '1993-07-28T00:00:00.000Z', to: '2005-07-28T00:00:00.000Z' }),
                gender: Math.random() < 0.5 ? 'M' : 'F'
            } as ProfileCreationAttributes

            const createdUser = await userService.create(userValues)
            await profileService.create({ ...profileValues, userId: createdUser.id })
        }

        // Seed Premium Package
        const packageRecords = [
            {
                name: 'Unlimited Swipe',
                description: 'User can have unlimited',
                price: 120000
            },
            {
                name: 'Verified Badge',
                description: 'User have verified Badge',
                price: 50000
            },
        ] as PremiumPackageCreationAttributes[]
        await premiumPackageService.createBulk(packageRecords)

        res.status(200).json({
            message: 'Table initialization success'
        })
    } catch(err) {
        console.log(err)
    }
})

export default router