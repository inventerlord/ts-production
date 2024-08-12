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
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
class MongoDb {
    constructor(mongoURI) {
        this.options = {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // serverSelectionTimeoutMS: 5000,
            // autoIndex: false, // Don't build indexes
            // maxPoolSize: 10, // Maintain up to 10 socket connections
            // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        };
        this.mongoURI = mongoURI;
        this.db = mongoose_1.default.connection;
        if (process.env.NODE_ENV !== 'production') {
            mongoose_1.default.set('debug', true);
        }
    }
    checkDbServer() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield mongodb_1.MongoClient.connect(this.mongoURI)
                    .then(() => {
                    resolve(true);
                })
                    .catch(() => {
                    resolve(false);
                });
            }));
        });
    }
    mongodbConnect() {
        mongoose_1.default.connect(this.mongoURI, this.options);
    }
}
exports.default = MongoDb;
