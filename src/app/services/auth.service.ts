import bcrypt from 'bcrypt'

import User from '../../models/user.model';
import UserService from "./user.service";
import { UserCreationAttributes } from "../../models/interfaces/user.interface";

import NotFoundException from '../exceptions/clientException/notFound.exception';
import UnauthorizedException from '../exceptions/clientException/unauthorized.exception';
import EmailAlreadyRegisteredException from '../exceptions/clientException/emailAlreadyRegistered.exception';

import connection from '../../database/connection';
import { generateToken } from '../utils/jwt.utils';
import { Transaction } from 'sequelize';
import ProfileService from './profile.service';
import { ProfileCreationAttributes } from '../../models/interfaces/profile.interface';

class AuthService {
    private userService
    private profileService

    constructor() {
        this.userService = UserService
        this.profileService = ProfileService
    }

    async signUp(data: UserCreationAttributes): Promise<User> {
        const { email, password } = data
        return connection.transaction(async (transaction: Transaction) => {
            try {
                const existingUser = await this.userService.findByEmail(email)
    
                if (existingUser) throw new EmailAlreadyRegisteredException('Email already registered!')
    
                const hashedPassword = await bcrypt.hash(password, 10)

                const createdUser = await this.userService.createUserWithTransaction({ ...data, password: hashedPassword }, transaction)

                await this.profileService.createProfileWithTransaction({ userId: createdUser.id } as ProfileCreationAttributes, transaction)

                return createdUser
            } catch (err) {
                console.log(err)
                throw err
            }
        })
    }

    async signIn(data: {
        email: string
        password: string
    }): Promise<string> {
        const { email, password } = data

        const user = await this.userService.findByEmail(email)
        if (!user) throw new NotFoundException('User Not Found!')

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) throw new UnauthorizedException('Invalid Password!')

        const token = generateToken({ userId: user.id, email: user.email, fullname: user.fullname })

        return token
    }
}

export default new AuthService()