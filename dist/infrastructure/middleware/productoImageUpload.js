"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoImageUpload = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("../config/storage");
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, callback) => {
        fs_1.default.mkdirSync(storage_1.productosImagesDir, { recursive: true });
        callback(null, storage_1.productosImagesDir);
    },
    filename: (_req, file, callback) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const extension = path_1.default.extname(file.originalname)
            .toLowerCase();
        callback(null, `producto-${uniqueSuffix}${extension}`);
    },
});
const imageFileFilter = (_req, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
        callback(new Error('Solo imágenes permitidas'));
        return;
    }
    callback(null, true);
};
exports.productoImageUpload = (0, multer_1.default)({
    storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
//# sourceMappingURL=productoImageUpload.js.map