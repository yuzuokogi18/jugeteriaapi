import express from 'express';

import dotenv from 'dotenv';

import authRoutes from './presentation/routes/auth.routes';

import categoriasRoutes from './presentation/routes/categorias.routes';

import productosRoutes from './presentation/routes/productos.routes';

import clientesRoutes from './presentation/routes/clientes.routes';

import ventasRoutes from './presentation/routes/ventas.routes';

import {
  ensureProductosImagesDir,
  publicDir,
} from './infrastructure/config/storage';

dotenv.config();

const app = express();

const PORT =
  process.env.PORT ?? 3000;

ensureProductosImagesDir();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  '/static',
  express.static(publicDir)
);

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/categorias',
  categoriasRoutes
);

app.use(
  '/api/productos',
  productosRoutes
);

app.use(
  '/api/clientes',
  clientesRoutes
);

app.use(
  '/api/ventas',
  ventasRoutes
);

app.get(
  '/health',
  (_req, res) => {

    res.json({
      status: 'ok',
      timestamp:
        new Date().toISOString(),
    });
  }
);

app.use((_req, res) => {

  res.status(404).json({
    error: 'Ruta no encontrada',
  });
});

app.listen(PORT, () => {

  console.log(
    `ToyStore API corriendo en http://localhost:${PORT}`
  );
});

export default app;