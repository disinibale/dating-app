import PremiumPackage from "../../models/premiumPackage.model";
import UserSubscriptions from "../../models/userSubscription.model";
import BaseService from "./base.service";

class UserSubscriptionsService extends BaseService<UserSubscriptions> {
    async getPurchasedPackage(userId: number): Promise<string[]> {
        const subscriptions: UserSubscriptions[] = await this.model.findAll({
            where: {
                userId
            }, include: {
                model: PremiumPackage,
                as: 'premiumPackage',
                attributes: [
                    'id',
                    'name'
                ]
            }
        })

        const userPackages: string[] = subscriptions.map(subscription => `has${subscription.premiumPackage.name.replace(' ', '')}`)

        return userPackages
    }
}

export default new UserSubscriptionsService(UserSubscriptions)