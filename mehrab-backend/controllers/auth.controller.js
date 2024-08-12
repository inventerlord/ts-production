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
exports.resetPassword = exports.confirmOtp = exports.forgotPassword = exports.refreshToken = exports.logout = exports.login = void 0;
const fs_1 = __importDefault(require("fs"));
const ApiError_1 = __importStar(require("../errors/ApiError"));
const auth_service_1 = require("../services/auth.service");
const User_1 = __importDefault(require("../models/User"));
const helper_utils_1 = require("../utils/helper.utils");
const mail_service_1 = require("../services/mail.service");
const ResetPasswordToken_1 = __importDefault(require("../models/ResetPasswordToken"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
// export const register = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { username, email, password, password_confirmation } = req.body;
//         const newUser = await createUser({ username, email, password, password_confirmation });
//         const token = await newUser.createAccessToken();
//         return res.status(StatusCodes.OK).json(newUser);
//     } catch (error) {
//         next(error);
//     }
// };
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const loggedUser = yield (0, auth_service_1.loginUser)({ username, password });
        const token = yield loggedUser.createAccessToken();
        const refresh_token = yield loggedUser.createRefreshToken();
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     path: '/',
        //     maxAge: 24 * 60 * 60 * 1000,
        // });
        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            path: '/api/v1/auth/refresh-token',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res.status(ApiError_1.StatusCodes.OK).json({ access_token: token, user: loggedUser.loginResponse() });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(ApiError_1.StatusCodes.OK).json(ApiError_1.ReasonPhrases.OK);
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(ApiError_1.StatusCodes.OK).json(ApiError_1.ReasonPhrases.OK);
    }
    catch (error) {
        next(error);
    }
});
exports.refreshToken = refreshToken;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const dbUser = yield User_1.default.findOne({ email: email });
        if (!dbUser)
            throw new ApiError_1.default({ email: "Email Does Not Exists, Please Try again" }, ApiError_1.StatusCodes.BAD_REQUEST);
        const template = fs_1.default.readFileSync('templates/emails/forgotPassword.email.template.ejs', { encoding: 'utf-8' });
        const otp = Math.floor(Math.random() * (9000 - 1000) + 1000);
        const bodyHtml = yield (0, helper_utils_1.renderEjsToHTMLStr)(template, { otp: otp });
        const info = yield (0, mail_service_1.sendSmtpMail)({
            from: '"PAVF ADMIN " <pavf@thekillcode.com>',
            replyTo: 'no-reply@thekillcode.com', // sender address
            to: `${email}`, // list of receivers
            subject: 'Forgot Password', // Subject line
            text: '', // plain text body
            html: bodyHtml,
        });
        return res.status(ApiError_1.StatusCodes.OK).json({
            otp: otp,
            envelope: info.envelope
        });
    }
    catch (error) {
        next(error);
    }
});
exports.forgotPassword = forgotPassword;
const confirmOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp_success, email } = req.body;
        const errors = {};
        !otp_success || otp_success !== 'success'
            ? (errors.otp_success = 'otp_success Field Is Required')
            : null;
        !email ? (errors.email = 'email Field Is Required') : null;
        if (Object.keys(errors).length > 0)
            throw new ApiError_1.default(errors, ApiError_1.StatusCodes.BAD_REQUEST);
        const oldToken = yield ResetPasswordToken_1.default.findOne({ email: email });
        const newToken = (0, helper_utils_1.generateString)(64);
        if (oldToken) {
            oldToken.token = newToken;
            yield oldToken.updateOne({ token: newToken });
        }
        const newResetPasswordToken = yield new ResetPasswordToken_1.default({ email: email, token: newToken }).save();
        return res.status(ApiError_1.StatusCodes.CREATED).json({
            reset_token: newResetPasswordToken.token,
            email: newResetPasswordToken.email,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.confirmOtp = confirmOtp;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reset_token, email, password, password_confirmation } = req.body;
        const errors = {};
        !reset_token
            ? (errors.reset_token = 'Reset Token Field Is Required')
            : null;
        !email ? (errors.email = 'email Field Is Required') : null;
        !password
            ? (errors.password = 'password is required')
            : !validator_1.default.isLength(password, { min: 6, max: 20 })
                ? (errors.password = 'password length must be between 5 to 20 character')
                : !validator_1.default.equals(password, password_confirmation)
                    ? (errors.password = 'password and confirm password mis-match')
                    : null;
        if (Object.keys(errors).length > 0)
            throw new ApiError_1.default(errors, ApiError_1.StatusCodes.BAD_REQUEST);
        const getToken = yield ResetPasswordToken_1.default.findOne({ email: email, token: reset_token });
        if (getToken) {
            const hashedPssword = yield (0, bcrypt_utils_1.hashPassword)(password);
            yield User_1.default.findOneAndUpdate({ email: email }, { password: hashedPssword });
            yield getToken.deleteOne();
            return res.status(ApiError_1.StatusCodes.ACCEPTED).json({
                message: "Password Updated Successfully"
            });
        }
        res.status(ApiError_1.StatusCodes.BAD_GATEWAY).json({
            message: "Invalid Token, Try Again"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.resetPassword = resetPassword;
// { "deviceID": "3d2c5777-25a4-455a-b8f3-fa0e135cc12b", "shelfID": "1", "shelfData_01": { "Moisture": "77", "Temperature": "245", "Conductivity": "274", "pH": "90" }}
