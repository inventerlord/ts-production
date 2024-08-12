"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = require("crypto");
const orderSchema = new mongoose_1.default.Schema({
    orderId: {
        type: mongoose_1.default.Schema.Types.UUID,
        required: true,
        default: () => (0, crypto_1.randomUUID)()
    },
    clientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    technicianId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    collection: 'orders',
    timestamps: true,
});
exports.default = mongoose_1.default.model('Order', orderSchema);
