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

// ✅ FIX: PORT siempre number (evita error TS)
const PORT: number = Number(process.env.PORT) || 3000;

// Asegurar carpeta de imágenes
ensureProductosImagesDir();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use('/static', express.static(publicDir));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/ventas', ventasRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// 404
app.use((_req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
  });
});

// ✅ IMPORTANTE: escuchar en todas las interfaces (EC2)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 ToyStore API corriendo en puerto ${PORT}`);
});

export default app;