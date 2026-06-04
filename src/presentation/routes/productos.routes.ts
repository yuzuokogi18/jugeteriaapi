import { Router } from 'express';

import {
  createProducto,
  getProductos,
  updateProducto,
  deleteProducto,
} from '../controllers/productos.controller';

import {
  authenticate,
  requireRole,
} from '../../infrastructure/middleware/auth.middleware';

import {
  productoImageUpload,
} from '../../infrastructure/middleware/productoImageUpload';

const router = Router();

router.use(authenticate);

router.get('/', getProductos);

router.post(
  '/',
  requireRole('admin'),
  productoImageUpload.single('imagen'),
  createProducto
);

router.put(
  '/:id',
  requireRole('admin'),
  productoImageUpload.single('imagen'),
  updateProducto
);

router.delete(
  '/:id',
  requireRole('admin'),
  deleteProducto
);

export default router;