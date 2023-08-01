import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

import userService from "../services/user.service";
import profileService from "../services/profile.service";
import premiumPackageService from "../services/premiumPackage.service";

import { UserCreationAttributes } from "../../models/interfaces/user.interface";
import { ProfileCreationAttributes } from "../../models/interfaces/profile.interface";
import { PremiumPackageCreationAttributes } from "../../models/interfaces/premiumPackage.interface";

import logger from "../../logger";

export default async function initializeTableData(): Promise<void> {
    try {
        const isUserDataExist = await userService.findAll()
        const isPremiumPackageExist = await premiumPackageService.findAll()

        if (isUserDataExist.length < 1 && isPremiumPackageExist.length < 1) {
            for (let i = 0; i < 50; i++) {
                let userValues
                if (i === 0) {  
                    userValues = {
                        email: 'bale@mail.com',
                        fullname: 'Bale',
                        password: await hash('password', 10)
                    } as UserCreationAttributes
                } else {
                    userValues = {
                        email: faker.internet.email(),
                        fullname: faker.person.fullName(),
                        password: await hash('password', 10)
                    } as UserCreationAttributes
                }
    
                const profileValues = {
                    bio: faker.music.songName(),
                    dateOfBirth: faker.date.between({ from: '1993-07-28T00:00:00.000Z', to: '2005-07-28T00:00:00.000Z' }),
                    gender: Math.random() < 0.5 ? 'M' : 'F'
                } as ProfileCreationAttributes
    
                const createdUser = await userService.create(userValues, { logging: false })
                await profileService.create({ ...profileValues, userId: createdUser.id }, { logging: false })
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
            await premiumPackageService.createBulk(packageRecords, { logging: false })
            logger.debug('Data initializing Success!')
        }

        return
    } catch (err) {
        throw new Error('Table Initialize failed!')
    }
}