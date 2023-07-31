import { Router } from "express";
import { register, login } from '../controllers/auth.controller'
import { createValidator } from '../middlewares/validators.middleware';
import { SignInDto, RegisterDto } from "../controllers/dto/auth.dto";

const router = Router()

router.post('/login', createValidator(SignInDto), login)
router.post('/register', createValidator(RegisterDto), register)

export default router