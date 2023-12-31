import { Router} from "express";
import authRouter from './auth.route'
import profileRouter from './profile.route'
import swipeRouter from './swipe.route'
import subscription from './subscription.route'

const router = Router()

router.use('/auth', authRouter)
router.use('/profile', profileRouter)
router.use('/matching', swipeRouter)
router.use('/subscription', subscription)

export default router