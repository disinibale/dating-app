import { Sequelize } from 'sequelize';
import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, DefaultScope, ForeignKey, CreatedAt, UpdatedAt, BelongsTo, HasMany } from 'sequelize-typescript'

import { ProfileAttributes, ProfileCreationAttributes } from './interfaces/profile.interface'

import User from './user.model'
import UserSwipe from './userSwipe.model'

const ageFormula = `(FLOOR(EXTRACT(epoch FROM AGE(NOW(), "dateOfBirth")) / 31536000))`;

@Table({
    tableName: 'profile',
})
@DefaultScope(() => ({ 
    attributes: { include: ['dateOfBirth', [Sequelize.literal(ageFormula), 'age']] },
}))
export default class Profile extends Model<ProfileAttributes, ProfileCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number

    @ForeignKey(() => User)
    userId!: number

    @Column(DataType.DATE)
    dateOfBirth!: Date

    @Column(DataType.STRING)
    bio!: string

    @Column(DataType.STRING)
    gender!: 'M' | 'F'

    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    createdAt!: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    updatedAt!: Date;

    @BelongsTo(() => User, 'userId')
    user!: User

    @HasMany(() => UserSwipe, 'profileId')
    userSwipe!: UserSwipe
}