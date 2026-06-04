import { Router } from 'express';

import {
  createCategoria,
  getCategorias,
  updateCategoria,
  deleteCategoria,
} from '../controllers/categorias.controller';

import {
  authenticate,
  requireRole,
} from '../../infrastructure/middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', getCategorias);

router.post(
  '/',
  requireRole('admin'),
  createCategoria
);

router.put(
  '/:id',
  requireRole('admin'),
  updateCategoria
);

router.delete(
  '/:id',
  requireRole('admin'),
  deleteCategoria
);

export default router;