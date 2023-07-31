import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import { PremiumPackageAttributes, PremiumPackageCreationAttributes } from './interfaces/premiumPackage.interface';

@Table({
    tableName: 'premium_package'
})
export default class PremiumPackage extends Model<PremiumPackageAttributes, PremiumPackageCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    price!: number
}