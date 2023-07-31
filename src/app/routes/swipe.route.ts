import { Router } from 'express'
import { authenticate } from '../middlewares/auth.middlware'

import { SwipeDto } from '../controllers/dto/swipe.dto'
import { createValidator } from '../middlewares/validators.middleware'
import { browsePotentialMatch, swipe } from '../controllers/swipe.controller'

const route = Router()

route.get('/', authenticate, browsePotentialMatch)
route.get('/matched', authenticate)
route.post('/swipe', authenticate, createValidator(SwipeDto), swipe)

export default route