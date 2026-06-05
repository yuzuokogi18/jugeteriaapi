"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./presentation/routes/auth.routes"));
const categorias_routes_1 = __importDefault(require("./presentation/routes/categorias.routes"));
const productos_routes_1 = __importDefault(require("./presentation/routes/productos.routes"));
const clientes_routes_1 = __importDefault(require("./presentation/routes/clientes.routes"));
const ventas_routes_1 = __importDefault(require("./presentation/routes/ventas.routes"));
const storage_1 = require("./infrastructure/config/storage");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3000;
(0, storage_1.ensureProductosImagesDir)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use('/static', express_1.default.static(storage_1.publicDir));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/categorias', categorias_routes_1.default);
app.use('/api/productos', productos_routes_1.default);
app.use('/api/clientes', clientes_routes_1.default);
app.use('/api/ventas', ventas_routes_1.default);
app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
    });
});
app.use((_req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
    });
});
app.listen(PORT, () => {
    console.log(`ToyStore API corriendo en http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map