"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoImageUrlFromFile = exports.ensureProductosImagesDir = exports.productosImagesDir = exports.publicDir = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.publicDir = path_1.default.join(process.cwd(), 'public');
exports.productosImagesDir = path_1.default.join(exports.publicDir, 'productos');
const ensureProductosImagesDir = () => {
    fs_1.default.mkdirSync(exports.productosImagesDir, { recursive: true });
};
exports.ensureProductosImagesDir = ensureProductosImagesDir;
const productoImageUrlFromFile = (fileName) => {
    return `/static/productos/${fileName}`;
};
exports.productoImageUrlFromFile = productoImageUrlFromFile;
//# sourceMappingURL=storage.js.map