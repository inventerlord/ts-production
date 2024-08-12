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
exports.renderEjsToHTMLStr = exports.myCustomDate = exports.generateString = exports.delay = void 0;
const ejs_1 = __importDefault(require("ejs"));
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.delay = delay;
const generateString = (length = 5) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateString = generateString;
const myCustomDate = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const hourArray = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    return `${date}/${month}/${year} ${hourArray[hours]}:${minutes}:${seconds} ${hours < 12 ? 'am' : 'pm'}`;
};
exports.myCustomDate = myCustomDate;
const renderEjsToHTMLStr = (template_1, ...args_1) => __awaiter(void 0, [template_1, ...args_1], void 0, function* (template, data = {}) {
    return new Promise((resolve, reject) => {
        try {
            const compiledEjs = ejs_1.default.compile(template);
            const emailHtml = compiledEjs(data);
            resolve(emailHtml);
        }
        catch (err) {
            reject(err);
        }
    });
});
exports.renderEjsToHTMLStr = renderEjsToHTMLStr;
