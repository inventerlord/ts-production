"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jwt_utills_1 = require("../utils/jwt.utills");
const generateToken = (payload, expiresIn, secret) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, jwt_utills_1.sign)(payload, expiresIn, secret);
});
exports.generateToken = generateToken;
const verifyToken = (token, secret) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, jwt_utills_1.verify)(token, secret);
});
exports.verifyToken = verifyToken;
