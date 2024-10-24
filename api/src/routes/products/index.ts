import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProduct,
  updateProduct,
} from './productsController';

// products endpoints
const router = Router();

router
  .get('/', listProduct)
  .get('/:id', getProductById)
  .post('/', createProduct)
  .put('/:id', updateProduct)
  .delete('/:id', deleteProduct);

export default router;
