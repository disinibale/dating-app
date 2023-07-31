import { Router } from "express";

import { createValidator } from "../middlewares/validators.middleware";
import { PurchaseSubscription } from "../controllers/dto/subscription.dto";

import { getAllPremiumPackage, purchasePremiumPackage } from "../controllers/subscription.controller";
import { authenticate } from '../middlewares/auth.middlware';

const router = Router()

router.get('/', getAllPremiumPackage)
router.post('/purchase', authenticate, createValidator(PurchaseSubscription), purchasePremiumPackage)

export default router