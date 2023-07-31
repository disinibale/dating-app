import { ProfileAttributes, ProfileCreationAttributes } from "../../models/interfaces/profile.interface";
import { Sequelize, Transaction } from "sequelize";

import Profile from "../../models/profile.model";
import BaseService from "./base.service";
import { Op } from "sequelize";
import UserSubscriptions from '../../models/userSubscription.model';
import User from "../../models/user.model";
import PremiumPackage from "../../models/premiumPackage.model";

class ProfileService extends BaseService<Profile> {
    async createProfileWithTransaction(profileData: ProfileCreationAttributes, transaction: Transaction): Promise<Profile> {
        return await this.create(profileData, {
            transaction
        })
    }

    async getByProfileId(profileId: number | undefined): Promise<Profile | null> {
        return await this.model.findOne({
            where: {
                userId: profileId
            },
            include: [{
                model: User,
                as: 'user',
                include: [{
                    model: UserSubscriptions,
                    as: 'userSubscriptions',
                    include: [{
                        model: PremiumPackage,
                        as: 'premiumPackage',
                    }]
                }],
            }]
        })
    }

    async getNullishParameter(profileId: number | undefined): Promise<string[]> {
        const profile = await this.model.findOne({
            where: {
                userId: profileId
            }
        })

        const values = profile?.dataValues as ProfileAttributes
        const nullishParams = []

        for (const key of Object.keys(values)) {
            if (values[key as keyof ProfileAttributes] === null) {
                nullishParams.push(key)
            }
        }

        return nullishParams
    }

    async browsePotentialProfile(userId: number, gender: 'M' | 'F', unswipedProfile: number[]): Promise<Profile[]> {
        return this.findAll({
            where: {
                id: {
                    [Op.notIn]: [...unswipedProfile]
                },
                gender: {
                    [Op.ne]: gender
                }
            },
            limit: 10,
            order: Sequelize.literal('RANDOM()')
        })
    }
}

export default new ProfileService(Profile)