"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTPMailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const settingsConfig_1 = __importDefault(require("../config/settingsConfig"));
exports.SMTPMailer = nodemailer_1.default.createTransport(Object.assign({}, settingsConfig_1.default.mail.smtp));
