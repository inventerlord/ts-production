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
exports.loginUser = void 0;
const validator_1 = __importDefault(require("validator"));
const ApiError_1 = __importStar(require("../errors/ApiError"));
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
const Admin_1 = __importDefault(require("../models/Admin"));
const loginUser = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = {};
    const { username, password } = loginData;
    !username ? errors.username = 'username is  required' : null;
    !password ? errors.password = 'password is  required' : null;
    if (Object.keys(errors).length > 0)
        throw new ApiError_1.default(errors, ApiError_1.StatusCodes.BAD_REQUEST);
    const queryParam = { username: username };
    if (validator_1.default.isEmail(username)) {
        queryParam.email = username;
        delete queryParam['username'];
    }
    const loginUser = yield Admin_1.default.findOne(queryParam).select('+password');
    yield loginUser.populate({ path: 'role', select: '-_id name' });
    yield loginUser.populate({ path: 'details', select: "-_id firstname lastname" });
    if (!loginUser)
        throw new ApiError_1.default('Invalid Credientials', ApiError_1.StatusCodes.UNAUTHORIZED);
    const passwordCheck = yield (0, bcrypt_utils_1.comparePassword)(password, loginUser.password);
    if (!passwordCheck)
        throw new ApiError_1.default('Invalid Credientials', ApiError_1.StatusCodes.UNAUTHORIZED);
    return loginUser;
});
exports.loginUser = loginUser;
