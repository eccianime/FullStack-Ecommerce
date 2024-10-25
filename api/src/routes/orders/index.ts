import { Router } from 'express';
import { insertOrderWithItemsSchema } from '../../db/ordersSchema.js';
import { verifyToken } from '../../middlewares/authMiddleware.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import { createOrder } from './ordersController.js';

// orders endpoints
const router = Router();

router.post(
  '/',
  verifyToken,
  validateData(insertOrderWithItemsSchema),
  createOrder
);

export default router;
