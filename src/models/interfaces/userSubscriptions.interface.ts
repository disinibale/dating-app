import { Model, Optional } from "sequelize"

export interface UserSubscriptionsAttributes extends Model {
    id?: number
    userId: number
    premiumPackageId: number

    createdAt?: Date
    updatedAt?: Date
}

export interface UserSubscriptionsCreationAttributes extends Optional<UserSubscriptionsAttributes, 'id'> {
    userId: number
    premiumPackageId: number
}