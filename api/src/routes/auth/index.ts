import { Router } from 'express';
import { validateData } from '../../middlewares/validationMiddleware.js';
import { register, login } from './authController.js';
import { createUserSchema, loginSchema } from '../../db/usersSchema.js';

// products endpoints
const router = Router();

router
  .post('/register', validateData(createUserSchema), register)
  .post('/login', validateData(loginSchema), login);

export default router;
