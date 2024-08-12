"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.default.Schema({
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
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    profile_pic: {
        type: String,
        required: false,
        default: ""
    },
    isTechnician: {
        type: Boolean,
        required: true,
        default: false
    },
    cart: [],
    addresses: [
        {
            title: { type: String, required: true },
            lat: { type: String, required: true },
            lon: { type: String, required: true },
            details: { type: String, required: true }
        }
    ],
    orders: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
}, {
    collection: 'users',
    timestamps: true,
});
// userSchema.pre('save', async function (this: IUser, next) {
//   try {
//     if (this.isNew) {
//     }
//     next()
//   }
//   catch (error: any) {
//     next(error);
//   }
// })
userSchema.methods.publicResponse = function () {
    const res = this.toObject();
    delete res['__v'];
    delete res['createdAt'];
    delete res['updatedAt'];
    delete res['cart'];
    delete res['addresses'];
    delete res['orders'];
    delete res['_id'];
    return res;
};
exports.default = mongoose_1.default.model('User', userSchema);
