import {
  Request,
  Response,
} from 'express';

import {
  CreateClienteUseCase,
  GetClientesUseCase,
} from '../../application/use-case/clientes/ClientesUseCases';

import { MySQLClientesRepository } from '../../infrastructure/repositories/clientes/MySQLClientesRepository';

const clientesRepo =
  new MySQLClientesRepository();

const createUC =
  new CreateClienteUseCase(
    clientesRepo
  );

const getUC =
  new GetClientesUseCase(
    clientesRepo
  );

export const createCliente =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const cliente =
        await createUC.execute(req.body);

      res.status(201).json(cliente);

    } catch {

      res.status(400).json({
        error: 'Error',
      });
    }
  };

export const getClientes =
  async (
    _req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const clientes =
        await getUC.execute();

      res.status(200).json(clientes);

    } catch {

      res.status(500).json({
        error: 'Error',
      });
    }
  };