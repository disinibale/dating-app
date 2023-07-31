import { Model, Optional } from "sequelize"

export interface PremiumPackageAttributes extends Model {
    id?: number
    name: string
    description: string
    price: number

    createdAt?: Date
    updatedAt?: Date
}

export interface PremiumPackageCreationAttributes extends Optional<PremiumPackageAttributes, 'id'> {
    name: string
    description: string
    price: number
}