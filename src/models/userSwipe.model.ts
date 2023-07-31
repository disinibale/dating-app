import { Model, Table, Column, DataType, ForeignKey,  PrimaryKey, AutoIncrement, BelongsTo } from 'sequelize-typescript'
import { UserSwipeAttributes, UserSwipeCreationAttributes } from './interfaces/userSwipe.interface'

import User from './user.model'
import Profile from './profile.model'

@Table({
    tableName: 'user_swipe'
})
export default class UserSwipe extends Model<UserSwipeAttributes, UserSwipeCreationAttributes> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isLiked!: boolean

    @ForeignKey(() => Profile)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    profileId!: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number

    @BelongsTo(() => User, 'userId')
    user!: User

    @BelongsTo(() => Profile, 'profileId')
    profile!: Profile
}