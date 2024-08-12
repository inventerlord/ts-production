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
exports.firebaseAuthMiddleware = exports.adminAuthMiddleware = void 0;
const ApiError_1 = __importStar(require("../errors/ApiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settingsConfig_1 = __importDefault(require("../config/settingsConfig"));
const firebase_utils_1 = __importDefault(require("../utils/firebase.utils"));
const adminAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization)
        return next(new ApiError_1.default(ApiError_1.ReasonPhrases.UNAUTHORIZED, ApiError_1.StatusCodes.UNAUTHORIZED));
    const bearerToken = req.headers.authorization;
    const completeToken = bearerToken.split(' ');
    const tokenKey = completeToken[0];
    const tokenValue = completeToken[1];
    if (tokenKey.toLowerCase() !== 'naqvi' || !tokenValue)
        return next(new ApiError_1.default('Invalid Token', ApiError_1.StatusCodes.UNAUTHORIZED));
    jsonwebtoken_1.default.verify(tokenValue, settingsConfig_1.default.jwt.secret, (err, payload) => {
        if (err)
            return next(new ApiError_1.default(ApiError_1.ReasonPhrases.UNAUTHORIZED, ApiError_1.StatusCodes.UNAUTHORIZED));
        req.user = payload;
        next();
    });
});
exports.adminAuthMiddleware = adminAuthMiddleware;
const firebaseAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization)
        return next(new ApiError_1.default(ApiError_1.ReasonPhrases.UNAUTHORIZED, ApiError_1.StatusCodes.UNAUTHORIZED));
    const bearerToken = req.headers.authorization;
    const completeToken = bearerToken.split(' ');
    const tokenKey = completeToken[0];
    const tokenValue = completeToken[1];
    if (tokenKey.toLowerCase() !== 'mehrab' || !tokenValue)
        return next(new ApiError_1.default('Invalid Token', ApiError_1.StatusCodes.UNAUTHORIZED));
    // const idToken = req.headers.authorization?.split('mehrab ')[1];
    if (!tokenValue) {
        return next(new ApiError_1.default(ApiError_1.ReasonPhrases.UNAUTHORIZED, ApiError_1.StatusCodes.UNAUTHORIZED));
    }
    try {
        const decodeToken = yield firebase_utils_1.default.auth().verifyIdToken(tokenValue);
        req.user = decodeToken;
        next();
    }
    catch (error) {
        const firebaseError = error;
        if (firebaseError.code === 'auth/id-token-expired') {
            return next(new ApiError_1.default("Token has expired", ApiError_1.StatusCodes.UNAUTHORIZED));
        }
        else if (firebaseError.code === 'auth/invalid-id-token') {
            return next(new ApiError_1.default("Invalid Token", ApiError_1.StatusCodes.UNAUTHORIZED));
        }
        else if (firebaseError.code === 'auth/argument-error') {
            return next(new ApiError_1.default("Invalid Token", ApiError_1.StatusCodes.UNAUTHORIZED));
        }
        next(error);
    }
});
exports.firebaseAuthMiddleware = firebaseAuthMiddleware;
const isFirebaseError = (error) => {
    return error.code !== undefined;
};
