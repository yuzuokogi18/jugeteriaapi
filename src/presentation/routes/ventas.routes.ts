import { Router } from 'express';

import {
  createVenta,
} from '../controllers/ventas.controller';

import {
  authenticate,
  requireRole,
} from '../../infrastructure/middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  requireRole('admin', 'empleado'),
  createVenta
);

export default router;