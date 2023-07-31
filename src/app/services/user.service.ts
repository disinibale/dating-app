import { Transaction } from "sequelize";
import { UserCreationAttributes } from "../../models/interfaces/user.interface";
import User from '../../models/user.model'
import BaseService from "./base.service";

class UserService extends BaseService<User> {
    async createUserWithTransaction(userData: UserCreationAttributes, transaction: Transaction): Promise<User> {
        return await this.model.create(userData, {
            transaction
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.model.findOne({ where: { email } })
    }
}

export default new UserService(User)