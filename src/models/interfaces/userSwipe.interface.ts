import { Model, Optional } from "sequelize"

export interface UserSwipeAttributes extends Model {
    id: number
    isLiked: boolean
    profileId: number
    userId: number

    createdAt?: Date
    updatedAt?: Date
}

export interface UserSwipeCreationAttributes extends Optional<UserSwipeAttributes, 'id'> {
    isLiked: boolean
    profileId: number
    userId: number
}