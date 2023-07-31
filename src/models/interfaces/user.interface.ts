import { Model, Optional } from "sequelize"
import Profile from "../profile.model"
import UserSwipe from "../userSwipe.model"
import UserSubscriptions from "../userSubscription.model"

export interface UserAttributes extends Model {
    id: number
    fullname: string
    email: string
    password: string

    profile: Profile
    userSwipe: UserSwipe
    userSubscriptions: UserSubscriptions

    createdAt?: Date
    updatedAt?: Date
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
    fullname: string
    email: string
    password: string
}