"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientes = exports.createCliente = void 0;
const ClientesUseCases_1 = require("../../application/use-case/clientes/ClientesUseCases");
const MySQLClientesRepository_1 = require("../../infrastructure/repositories/clientes/MySQLClientesRepository");
const clientesRepo = new MySQLClientesRepository_1.MySQLClientesRepository();
const createUC = new ClientesUseCases_1.CreateClienteUseCase(clientesRepo);
const getUC = new ClientesUseCases_1.GetClientesUseCase(clientesRepo);
const createCliente = async (req, res) => {
    try {
        const cliente = await createUC.execute(req.body);
        res.status(201).json(cliente);
    }
    catch {
        res.status(400).json({
            error: 'Error',
        });
    }
};
exports.createCliente = createCliente;
const getClientes = async (_req, res) => {
    try {
        const clientes = await getUC.execute();
        res.status(200).json(clientes);
    }
    catch {
        res.status(500).json({
            error: 'Error',
        });
    }
};
exports.getClientes = getClientes;
//# sourceMappingURL=clientes.controller.js.map