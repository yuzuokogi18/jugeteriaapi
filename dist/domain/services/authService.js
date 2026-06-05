"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SALT_ROUNDS = 12;
const hashPassword = async (plain) => bcryptjs_1.default.hash(plain, SALT_ROUNDS);
exports.hashPassword = hashPassword;
const comparePassword = async (plain, hash) => bcryptjs_1.default.compare(plain, hash);
exports.comparePassword = comparePassword;
const signToken = (user) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = (process.env.JWT_EXPIRES_IN ||
        '7d');
    const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
    };
    return jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn,
    });
};
exports.signToken = signToken;
const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=authService.js.map