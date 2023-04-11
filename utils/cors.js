"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const allowedOrigins = [
    process.env.CLIENT_ORIGIN_URL,
    process.env.CLIENT_ORIGIN_LOCAL_URL,
    process.env.CLIENT_ORIGIN_DEV_URL,
];
const options = {
    origin: allowedOrigins,
};
exports.default = (0, cors_1.default)(options);
