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
const validator_1 = __importDefault(require("validator"));
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
const token_service_1 = require("../services/token.service");
const settingsConfig_1 = __importDefault(require("../config/settingsConfig"));
const adminSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [(value) => { return validator_1.default.isEmail(value); }, 'Please Enter A Valid Email']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    role: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Role',
    },
    details: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'AdminDetail',
        unique: true,
    },
}, {
    collection: 'admins',
    timestamps: true,
});
adminSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (this.isNew) {
                this.password = yield (0, bcrypt_utils_1.hashPassword)(this.password);
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
adminSchema.methods.createAccessToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, token_service_1.generateToken)({ userId: this._id }, '1d', settingsConfig_1.default.jwt.secret);
    });
};
adminSchema.methods.createRefreshToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, token_service_1.generateToken)({ userId: this._id }, '30d', settingsConfig_1.default.jwt.refresh_secret);
    });
};
adminSchema.methods.newUserResponse = function () {
    const res = this.toObject();
    delete res['password'];
    delete res['_id'];
    delete res['__v'];
    res.role = res.role.name;
    return res;
};
adminSchema.methods.loginResponse = function () {
    const res = this.toObject();
    delete res['password'];
    delete res['__v'];
    delete res['createdAt'];
    delete res['updatedAt'];
    delete res['_id'];
    res.role = res.role.name;
    return res;
};
adminSchema.methods.publicResponse = function () {
    const res = this.toObject();
    delete res['password'];
    delete res['__v'];
    delete res['createdAt'];
    delete res['updatedAt'];
    delete res['_id'];
    res.role = res.role.name;
    return res;
};
exports.default = mongoose_1.default.model('Admin', adminSchema);
