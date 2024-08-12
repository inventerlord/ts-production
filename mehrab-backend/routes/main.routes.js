"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lodash_1 = __importDefault(require("lodash"));
const Role_1 = __importDefault(require("../models/Role"));
const ApiError_1 = __importStar(require("../errors/ApiError"));
const helper_utils_1 = require("../utils/helper.utils");
const Admin_1 = __importDefault(require("../models/Admin"));
const AdminDetail_1 = __importDefault(require("../models/AdminDetail"));
const mainRouter = express_1.default.Router();
mainRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json({
            message: 'Welcome to Api Server ',
        });
    }
    catch (error) {
        next(error);
    }
}));
mainRouter.get('/countries', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = [
            { name: "Pakistan", code: "+92", image: "flags/250/pk.png" }
        ];
        return res.status(200).json(countries);
    }
    catch (error) {
        next(error);
    }
}));
mainRouter.get('/role-seeder', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.query;
        if (!password) {
            return res.status(ApiError_1.StatusCodes.OK).json({ message: "Welcome Role Seeder Route" });
        }
        if (password !== '123456') {
            throw new ApiError_1.default('Incorrect Seeder Password', ApiError_1.StatusCodes.UNAUTHORIZED);
        }
        const adminArray = [
            { name: 'Admin', slug: lodash_1.default.kebabCase('Admin') },
        ];
        if (adminArray.length > 0) {
            const rolesCreated = yield Role_1.default.insertMany(adminArray);
            return res.status(ApiError_1.StatusCodes.CREATED).json({ roles: rolesCreated });
        }
    }
    catch (error) {
        next(error);
    }
}));
mainRouter.get('/admin-seeder', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.query;
        if (!password) {
            return res.status(ApiError_1.StatusCodes.OK).json({ message: "Welcome admin Seeder Route" });
        }
        if (password !== '123456') {
            throw new ApiError_1.default('Incorrect Seeder Password', ApiError_1.StatusCodes.UNAUTHORIZED);
        }
        // const roleArray = [
        //     { name: 'Admin', slug: _.kebabCase('Admin') },
        //     { name: 'User', slug: _.kebabCase('User') },
        // ];
        // if (roleArray.length > 0) {
        //     const rolesCreated = await Role.insertMany(roleArray)
        //     return res.status(StatusCodes.CREATED).json({ roles: rolesCreated });
        // }
        const dbAdmin = yield Admin_1.default.findOne({
            $or: [{ email: "admin@mehrab.com" }, { username: "admin" }]
        });
        if (dbAdmin) {
            throw new ApiError_1.default("Admins Already Seedeed", ApiError_1.StatusCodes.BAD_REQUEST);
        }
        const adminRole = yield Role_1.default.findOne({ slug: "admin" });
        const adminDetail = yield new AdminDetail_1.default({
            firstname: "",
            lastname: ""
        }).save();
        const newAdmin = yield new Admin_1.default({
            username: "admin",
            email: "admin@mehrab.com",
            password: "Faroogh123!@#",
            role: adminRole === null || adminRole === void 0 ? void 0 : adminRole._id,
            details: adminDetail._id
        }).save();
        return res.status(200).json(newAdmin);
    }
    catch (error) {
        next(error);
    }
}));
mainRouter.get('/test', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log((0, helper_utils_1.myCustomDate)());
        return res.json("done");
    }
    catch (error) {
        next(error);
    }
}));
exports.default = mainRouter;
