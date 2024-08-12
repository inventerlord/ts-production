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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
const ApiError_1 = require("../errors/ApiError");
const Admin_1 = __importDefault(require("../models/Admin"));
const profile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminUser = yield Admin_1.default.findById(req.user.userId);
        yield (adminUser === null || adminUser === void 0 ? void 0 : adminUser.populate({ path: 'role', select: '-_id name' }));
        yield (adminUser === null || adminUser === void 0 ? void 0 : adminUser.populate({ path: 'details', select: '-_id firstname lastname' }));
        res.status(ApiError_1.StatusCodes.OK).json(adminUser === null || adminUser === void 0 ? void 0 : adminUser.publicResponse());
    }
    catch (error) {
        next(error);
    }
});
exports.profile = profile;
