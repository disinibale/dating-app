import { Model, Optional } from "sequelize"
import User from "../user.model"

export interface ProfileAttributes extends Model {
    id: number
    userId: number
    dateOfBirth?: Date
    bio?: string
    gender?: 'M' | 'F'    

    user: User

    createdAt?: Date
    updatedAt?: Date
}

export interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'id'> {
    userId: number
    dateOfBirth?: Date
    bio?: string
    gender?: 'M' | 'F'    
}