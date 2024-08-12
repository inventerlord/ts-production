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
exports.trimBody = void 0;
const trimStringProperties = (obj) => {
    if (obj !== null && typeof obj === 'object') {
        for (var prop in obj) {
            // if the property is an object trim it too
            if (typeof obj[prop] === 'object') {
                return trimStringProperties(obj[prop]);
            }
            // if it's a string remove begin and end whitespaces
            if (typeof obj[prop] === 'string') {
                obj[prop] = obj[prop].trim();
            }
        }
    }
};
const trimBody = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body) {
        if (req.body !== null && typeof req.body === 'object') {
            for (let prop in req.body) {
                if (typeof req.body[prop] === 'string') {
                    req.body[prop] = req.body[prop].trim();
                }
            }
        }
    }
    next();
});
exports.trimBody = trimBody;
