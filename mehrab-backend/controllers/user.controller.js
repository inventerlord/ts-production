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
exports.createAddress = exports.getAddresses = exports.profileUpdate = exports.createProfile = exports.profile = void 0;
const ApiError_1 = __importStar(require("../errors/ApiError"));
const User_1 = __importDefault(require("../models/User"));
const validator_1 = __importDefault(require("validator"));
const profile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ uuid: req.user.uid });
        return res.status(ApiError_1.StatusCodes.OK).json(user === null || user === void 0 ? void 0 : user.publicResponse());
    }
    catch (error) {
        next(error);
    }
});
exports.profile = profile;
const createProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, profile_pic } = req.body;
    const errors = {};
    const fbUser = req.user;
    !username
        ? errors.username = 'Username is Required'
        : !validator_1.default.isLength(username, { min: 3, max: 10 })
            ? errors.username = "username length must be between 3 to 10"
            : null;
    !email
        ? (errors.email = 'email is required')
        : !validator_1.default.isEmail(email)
            ? (errors.email = 'please enter valid Email')
            : null;
    try {
        const dbUser = yield User_1.default.findOne({
            $or: [{ phone: fbUser.phone_number }, { username: username }, { email: email }]
        });
        if (dbUser) {
            dbUser.username === username
                ? errors.username = "Username Already Exists"
                : null;
            dbUser.email === email
                ? errors.email = 'Email Already Exists'
                : null;
            dbUser.phone === fbUser.phone_number
                ? errors.phone = 'Phone Already Exists'
                : null;
            if (Object.keys(errors).length > 0) {
                throw new ApiError_1.default(errors, ApiError_1.StatusCodes.BAD_REQUEST);
            }
        }
        const user = new User_1.default();
        user.username = username;
        user.email = email;
        user.uuid = fbUser.uid;
        user.phone = fbUser.phone_number;
        user.profile_pic = profile_pic;
        user.isTechnician = false;
        yield user.save();
        return res.status(ApiError_1.StatusCodes.OK).json(user === null || user === void 0 ? void 0 : user.publicResponse());
    }
    catch (error) {
        next(error);
    }
});
exports.createProfile = createProfile;
const profileUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { firstname, lastname } = req.body;
        // const user = await User.findById(req.user.userId);
        // const detail = await UserDetail.findById(user?.details);
        // await detail?.updateOne({
        //     firstname: firstname,
        //     lastname: lastname,
        // })
        res.status(ApiError_1.StatusCodes.OK).json("detail");
    }
    catch (error) {
        next(error);
    }
});
exports.profileUpdate = profileUpdate;
const getAddresses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ uuid: req.user.uid }, { addresses: true });
        res.status(ApiError_1.StatusCodes.OK).json(user === null || user === void 0 ? void 0 : user.addresses);
    }
    catch (error) {
        next(error);
    }
});
exports.getAddresses = getAddresses;
const createAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, lat, lon, details } = req.body;
    try {
        const user = yield User_1.default.findOne({ uuid: req.user.uid }, { addresses: true });
        const filAdd = user.addresses.filter((address) => address.title == title);
        if (filAdd.length > 0) {
            throw new ApiError_1.default("Address Title Must be unique", ApiError_1.StatusCodes.BAD_REQUEST);
        }
        user.addresses = [...user.addresses,
            {
                title: title,
                lat: lat,
                lon: lon,
                details: details,
            }];
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(ApiError_1.StatusCodes.OK).json(user === null || user === void 0 ? void 0 : user.addresses);
    }
    catch (error) {
        next(error);
    }
});
exports.createAddress = createAddress;
