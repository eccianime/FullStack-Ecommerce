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

// products endpoints
const router = Router();

router
  .get('/', listProduct)
  .get('/:id', getProductById)
  .post('/', validateData(createProductSchema), createProduct)
  .put('/:id', validateData(updateProductSchema), updateProduct)
  .delete('/:id', deleteProduct);

export default router;
