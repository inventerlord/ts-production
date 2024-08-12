"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main_routes_1 = __importDefault(require("./main.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const adminuser_routes_1 = __importDefault(require("./adminuser.routes"));
const routes = express_1.default.Router();
routes.use('/', main_routes_1.default);
routes.use('/auth', auth_routes_1.default);
routes.use('/user', authMiddleware_1.firebaseAuthMiddleware, user_routes_1.default);
routes.use('/admin-user', authMiddleware_1.adminAuthMiddleware, adminuser_routes_1.default);
exports.default = routes;
