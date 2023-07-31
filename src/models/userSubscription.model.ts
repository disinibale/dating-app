import { Model, Table, Column, DataType, ForeignKey, PrimaryKey, AutoIncrement, BelongsTo } from 'sequelize-typescript';

import { UserSubscriptionsAttributes, UserSubscriptionsCreationAttributes } from './interfaces/userSubscriptions.interface';

import PremiumPackage from './premiumPackage.model';
import User from './user.model';

@Table({
    tableName: 'users_subscriptions'
})
export default class UserSubscriptions extends Model<UserSubscriptionsAttributes, UserSubscriptionsCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number

    @ForeignKey(() => PremiumPackage)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    premiumPackageId!: number

    @BelongsTo(() => User)
    user!: User

    @BelongsTo(() => PremiumPackage)
    premiumPackage!: PremiumPackage
}