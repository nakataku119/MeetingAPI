"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserIdToReq = void 0;
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const setUserIdToReq = (req, res, next) => {
    const decodedJwt = (0, jwt_decode_1.default)(req.headers["authorization"].split(" ")[1]);
    req.body.id = decodedJwt.sub;
    next();
};
exports.setUserIdToReq = setUserIdToReq;
