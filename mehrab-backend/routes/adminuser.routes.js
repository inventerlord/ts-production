"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminuser_controller_1 = require("../controllers/adminuser.controller");
const adminUserRouter = express_1.default.Router();
adminUserRouter.get('/', adminuser_controller_1.profile);
exports.default = adminUserRouter;
