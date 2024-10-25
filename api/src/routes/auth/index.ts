import { Router } from 'express';
import { validateData } from '../../middlewares/validationMiddleware';
import { register, login } from './authController';
import { createUserSchema, loginSchema } from '../../db/usersSchema';

// products endpoints
const router = Router();

router
  .post('/register', validateData(createUserSchema), register)
  .post('/login', validateData(loginSchema), login);

export default router;
