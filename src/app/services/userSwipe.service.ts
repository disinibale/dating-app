import BaseService from "./base.service";
import UserSwipe from "../../models/userSwipe.model";
import { Op } from "sequelize";

class UserSwipeService extends BaseService<UserSwipe> {
    async isAlreadySwiped(userId: number, profileId: number): Promise<UserSwipe | null> { 
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        return await this.model.findOne({
            where: {
                userId,
                profileId,
                createdAt: {
                    [Op.gte]: today
                }
            }
        })
    }

    async getAllSwipedForToday(userId: number): Promise<UserSwipe[]> {
        return this.model.findAll({
            where: {
                userId,
                createdAt: {
                    [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0))
                }
            },
            attributes: ['profileId']
        })
    }
}

export default new UserSwipeService(UserSwipe)