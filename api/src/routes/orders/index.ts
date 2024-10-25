import { Router } from 'express';
import {
  insertOrderWithItemsSchema,
  updateOrderSchema,
} from '../../db/ordersSchema.js';
import { verifyToken } from '../../middlewares/authMiddleware.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
} from './ordersController.js';

// orders endpoints
const router = Router();

router
  .post('/', verifyToken, validateData(insertOrderWithItemsSchema), createOrder)
  .get('/', verifyToken, listOrders)
  .get('/:id', verifyToken, getOrderById)
  .put('/:id', verifyToken, validateData(updateOrderSchema), updateOrder);

export default router;
