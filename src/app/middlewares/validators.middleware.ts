import { plainToClass } from "class-transformer";
import { validate } from 'class-validator'
import { Request, Response, NextFunction } from "express";
import { ModelCreationAttributes } from "./interfaces/validator.interface";

export function createValidator<T extends object>(validationClass: new () => T) {
    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            const data = plainToClass(validationClass, req.body)
            const errors = await validate(data)

            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((err) => err.constraints) })
            }

            req.body = data as ModelCreationAttributes<T>;
            next()
        } catch (err) {
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }
}