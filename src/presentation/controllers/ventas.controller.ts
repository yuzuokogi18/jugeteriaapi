import {
  Response,
} from 'express';

import {
  CreateVentaUseCase,
} from '../../application/use-case/ventas/VentasUseCases';

import { MySQLVentasRepository } from '../../infrastructure/repositories/ventas/MySQLVentasRepository';

import { MySQLProductosRepository } from '../../infrastructure/repositories/productos/MySQLProductosRepository';

import { AuthRequest } from '../../infrastructure/middleware/auth.middleware';

const ventasRepo =
  new MySQLVentasRepository();

const productosRepo =
  new MySQLProductosRepository();

const createUC =
  new CreateVentaUseCase(
    ventasRepo,
    productosRepo
  );

export const createVenta =
  async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {

    try {

      const venta =
        await createUC.execute(
          req.body,
          req.user!.sub
        );

      res.status(201).json(venta);

    } catch (err: unknown) {

      const msg =
        err instanceof Error
          ? err.message
          : 'Error';

      res.status(400).json({
        error: msg,
      });
    }
  };