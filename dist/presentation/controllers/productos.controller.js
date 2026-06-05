"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducto = exports.updateProducto = exports.getProductos = exports.createProducto = void 0;
const ProductosUseCases_1 = require("../../application/use-case/productos/ProductosUseCases");
const MySQLProductosRepository_1 = require("../../infrastructure/repositories/productos/MySQLProductosRepository");
const storage_1 = require("../../infrastructure/config/storage");
const productosRepo = new MySQLProductosRepository_1.MySQLProductosRepository();
const createUC = new ProductosUseCases_1.CreateProductoUseCase(productosRepo);
const getUC = new ProductosUseCases_1.GetProductosUseCase(productosRepo);
const updateUC = new ProductosUseCases_1.UpdateProductoUseCase(productosRepo);
const deleteUC = new ProductosUseCases_1.DeleteProductoUseCase(productosRepo);
const createProducto = async (req, res) => {
    try {
        const imagenUrl = req.file?.filename
            ? (0, storage_1.productoImageUrlFromFile)(req.file.filename)
            : req.body.imagenUrl;
        const producto = await createUC.execute({
            ...req.body,
            imagenUrl,
        });
        res.status(201).json(producto);
    }
    catch (err) {
        const msg = err instanceof Error
            ? err.message
            : 'Error';
        res.status(400).json({
            error: msg,
        });
    }
};
exports.createProducto = createProducto;
const getProductos = async (_req, res) => {
    try {
        const productos = await getUC.execute();
        res.status(200).json(productos);
    }
    catch {
        res.status(500).json({
            error: 'Error',
        });
    }
};
exports.getProductos = getProductos;
const updateProducto = async (req, res) => {
    try {
        const imagenUrl = req.file?.filename
            ? (0, storage_1.productoImageUrlFromFile)(req.file.filename)
            : req.body.imagenUrl;
        const producto = await updateUC.execute(req.params['id'], {
            ...req.body,
            imagenUrl,
        });
        res.status(200).json(producto);
    }
    catch (err) {
        const msg = err instanceof Error
            ? err.message
            : 'Error';
        res.status(400).json({
            error: msg,
        });
    }
};
exports.updateProducto = updateProducto;
const deleteProducto = async (req, res) => {
    try {
        await deleteUC.execute(req.params['id']);
        res.status(204).send();
    }
    catch (err) {
        const msg = err instanceof Error
            ? err.message
            : 'Error';
        res.status(404).json({
            error: msg,
        });
    }
};
exports.deleteProducto = deleteProducto;
//# sourceMappingURL=productos.controller.js.map