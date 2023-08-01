import { NextFunction, Request, Response } from "express";

import { ProfileCreationAttributes } from "../../models/interfaces/profile.interface";
import Profile from "../../models/profile.model";

import ProfileService from "../services/profile.service";

import { mapProfile } from "../utils/profile.utils";

export interface MappedProfile {
    profile: {
        id: number;
        dateOfBirth: Date | null;
        bio: string | null;
        gender: string | null;
        userId: number;
        age: number | null;
        fullname: string;
        premiumPackages: string[];
    };
}

export async function getMyProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = req.user
    try {
        const profile = await ProfileService.getByProfileId(user?.userId)
        const missingProfile = await ProfileService.getNullishParameter(user?.userId)

        const mappedProfile = mapProfile(profile as Profile)

        res.status(200).json({
            message: 'Success',
            data: {
                ...mappedProfile.profile,
                userId: user?.userId,
                email: user?.email,
            },
            missingProfile
        })
    } catch (err) {
        next(err)
    }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = req.user
    const body = req.body as ProfileCreationAttributes

    try {
        const updatedProfile = await ProfileService.update(body, {
            where: {
                userId: user?.userId
            }
        })

        res.status(201).json({
            message: 'Success',
            code: 201,
            data: updatedProfile
        })
    } catch (err) {
        next(err)
    }
}