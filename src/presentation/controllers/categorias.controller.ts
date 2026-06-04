import {
  Request,
  Response,
} from 'express';

import {
  CreateCategoriaUseCase,
  GetCategoriasUseCase,
  UpdateCategoriaUseCase,
  DeleteCategoriaUseCase,
} from '../../application/use-case/categorias/CategoriasUseCases';

import { MySQLCategoriasRepository } from '../../infrastructure/repositories/categorias/MySQLCategoriasRepository';

const categoriasRepo =
  new MySQLCategoriasRepository();

const createUC =
  new CreateCategoriaUseCase(
    categoriasRepo
  );

const getUC =
  new GetCategoriasUseCase(
    categoriasRepo
  );

const updateUC =
  new UpdateCategoriaUseCase(
    categoriasRepo
  );

const deleteUC =
  new DeleteCategoriaUseCase(
    categoriasRepo
  );

export const createCategoria =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const categoria =
        await createUC.execute(req.body);

      res.status(201).json(categoria);

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

export const getCategorias =
  async (
    _req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const categorias =
        await getUC.execute();

      res.status(200).json(categorias);

    } catch {

      res.status(500).json({
        error: 'Error',
      });
    }
  };

export const updateCategoria =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const categoria =
        await updateUC.execute(
          req.params['id'] as string,
          req.body
        );

      res.status(200).json(categoria);

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

export const deleteCategoria =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {

    try {

      await deleteUC.execute(
        req.params['id'] as string
      );

      res.status(204).send();

    } catch (err: unknown) {

      const msg =
        err instanceof Error
          ? err.message
          : 'Error';

      res.status(404).json({
        error: msg,
      });
    }
  };