import { Router } from 'express'
import { authenticate } from '../middlewares/auth.middlware'
import { getMyProfile, updateProfile } from '../controllers/profile.controller'
import { createValidator } from '../middlewares/validators.middleware';
import { ProfileDto } from '../controllers/dto/profile.dto';

const profileRoute = Router()

profileRoute.get('/', authenticate, getMyProfile)
profileRoute.put('/', authenticate, createValidator(ProfileDto), updateProfile)

export default profileRoute