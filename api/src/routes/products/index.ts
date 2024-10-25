import { Router } from 'express';
import { validateData } from '../../middlewares/validationMiddleware.js';
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProduct,
  updateProduct,
} from './productsController.js';

import {
  createProductSchema,
  updateProductSchema,
} from '../../db/productsSchema.js';
import { verifySeller, verifyToken } from '../../middlewares/authMiddleware.js';

// products endpoints
const router = Router();

router
  .get('/', listProduct)
  .get('/:id', getProductById)
  .post(
    '/',
    verifyToken,
    verifySeller,
    validateData(createProductSchema),
    createProduct
  )
  .put(
    '/:id',
    verifyToken,
    verifySeller,
    validateData(updateProductSchema),
    updateProduct
  )
  .delete('/:id', verifyToken, verifySeller, deleteProduct);

export default router;
