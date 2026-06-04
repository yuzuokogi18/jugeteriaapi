import fs from 'fs';
import path from 'path';

export const publicDir =
  path.join(process.cwd(), 'public');

export const productosImagesDir =
  path.join(publicDir, 'productos');

export const ensureProductosImagesDir =
  (): void => {

    fs.mkdirSync(
      productosImagesDir,
      { recursive: true }
    );
  };

export const productoImageUrlFromFile =
  (fileName: string): string => {

    return `/static/productos/${fileName}`;
  };