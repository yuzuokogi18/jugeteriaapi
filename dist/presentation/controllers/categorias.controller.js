"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoria = exports.updateCategoria = exports.getCategorias = exports.createCategoria = void 0;
const CategoriasUseCases_1 = require("../../application/use-case/categorias/CategoriasUseCases");
const MySQLCategoriasRepository_1 = require("../../infrastructure/repositories/categorias/MySQLCategoriasRepository");
const categoriasRepo = new MySQLCategoriasRepository_1.MySQLCategoriasRepository();
const createUC = new CategoriasUseCases_1.CreateCategoriaUseCase(categoriasRepo);
const getUC = new CategoriasUseCases_1.GetCategoriasUseCase(categoriasRepo);
const updateUC = new CategoriasUseCases_1.UpdateCategoriaUseCase(categoriasRepo);
const deleteUC = new CategoriasUseCases_1.DeleteCategoriaUseCase(categoriasRepo);
const createCategoria = async (req, res) => {
    try {
        const categoria = await createUC.execute(req.body);
        res.status(201).json(categoria);
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
exports.createCategoria = createCategoria;
const getCategorias = async (_req, res) => {
    try {
        const categorias = await getUC.execute();
        res.status(200).json(categorias);
    }
    catch {
        res.status(500).json({
            error: 'Error',
        });
    }
};
exports.getCategorias = getCategorias;
const updateCategoria = async (req, res) => {
    try {
        const categoria = await updateUC.execute(req.params['id'], req.body);
        res.status(200).json(categoria);
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
exports.updateCategoria = updateCategoria;
const deleteCategoria = async (req, res) => {
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
exports.deleteCategoria = deleteCategoria;
//# sourceMappingURL=categorias.controller.js.map