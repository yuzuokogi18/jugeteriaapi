import {
  Request,
  Response,
} from 'express';

import {
  CreateProductoUseCase,
  GetProductosUseCase,
  UpdateProductoUseCase,
  DeleteProductoUseCase,
} from '../../application/use-case/productos/ProductosUseCases';

import { MySQLProductosRepository } from '../../infrastructure/repositories/productos/MySQLProductosRepository';

import {
  productoImageUrlFromFile,
} from '../../infrastructure/config/storage';

const productosRepo =
  new MySQLProductosRepository();

const createUC =
  new CreateProductoUseCase(
    productosRepo
  );

const getUC =
  new GetProductosUseCase(
    productosRepo
  );

const updateUC =
  new UpdateProductoUseCase(
    productosRepo
  );

const deleteUC =
  new DeleteProductoUseCase(
    productosRepo
  );

export const createProducto =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const imagenUrl =
        req.file?.filename
          ? productoImageUrlFromFile(
              req.file.filename
            )
          : req.body.imagenUrl;

      const producto =
        await createUC.execute({
          ...req.body,
          imagenUrl,
        });

      res.status(201).json(producto);

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

export const getProductos =
  async (
    _req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const productos =
        await getUC.execute();

      res.status(200).json(productos);

    } catch {

      res.status(500).json({
        error: 'Error',
      });
    }
  };

export const updateProducto =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const imagenUrl =
        req.file?.filename
          ? productoImageUrlFromFile(
              req.file.filename
            )
          : req.body.imagenUrl;

      const producto =
        await updateUC.execute(
          req.params['id'] as string,
          {
            ...req.body,
            imagenUrl,
          }
        );

      res.status(200).json(producto);

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

export const deleteProducto =
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