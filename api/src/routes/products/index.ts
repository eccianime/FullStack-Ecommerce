import { Router } from 'express';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProduct,
  updateProduct,
} from './productsController';

import {
  createProductSchema,
  updateProductSchema,
} from '../../db/productsSchema';
import { verifySeller, verifyToken } from '../../middlewares/authMiddleware';

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
