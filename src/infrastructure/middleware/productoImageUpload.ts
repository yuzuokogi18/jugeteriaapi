import fs from 'fs';

import path from 'path';

import multer from 'multer';

import {
  productosImagesDir,
} from '../config/storage';

const storage =
  multer.diskStorage({

    destination: (
      _req,
      _file,
      callback
    ) => {

      fs.mkdirSync(
        productosImagesDir,
        { recursive: true }
      );

      callback(
        null,
        productosImagesDir
      );
    },

    filename: (
      _req,
      file,
      callback
    ) => {

      const uniqueSuffix =
        `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

      const extension =
        path.extname(file.originalname)
        .toLowerCase();

      callback(
        null,
        `producto-${uniqueSuffix}${extension}`
      );
    },
  });

const imageFileFilter:
  multer.Options['fileFilter'] =
  (_req, file, callback) => {

    if (
      !file.mimetype.startsWith('image/')
    ) {

      callback(
        new Error(
          'Solo imágenes permitidas'
        )
      );

      return;
    }

    callback(null, true);
  };

export const productoImageUpload =
  multer({

    storage,

    fileFilter: imageFileFilter,

    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });