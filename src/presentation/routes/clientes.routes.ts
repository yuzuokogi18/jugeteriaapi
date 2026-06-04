import { Router } from 'express';

import {
  createCliente,
  getClientes,
} from '../controllers/clientes.controller';

import {
  authenticate,
  requireRole,
} from '../../infrastructure/middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  requireRole('admin', 'empleado'),
  getClientes
);

router.post(
  '/',
  requireRole('admin', 'empleado'),
  createCliente
);

export default router;