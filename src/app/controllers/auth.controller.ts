import { Request, Response, NextFunction } from "express";

import authService from "../services/auth.service";
import { UserCreationAttributes } from "../../models/interfaces/user.interface";

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const payload = req.body as UserCreationAttributes
    try {
        const user = await authService.signUp(payload)

        res.status(201).json({
            message: 'Successfully Registered!',
            code: 201,
            data: user
        })
    } catch (err) {
        next(err)
    }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body
    try {
        const auth = await authService.signIn({ email, password })

        res.status(200).json({
            message: 'User Authenticated!',
            code: 200,
            data: {
                token: auth
            }
        })
    } catch (err) {
        next(err)
    }
}