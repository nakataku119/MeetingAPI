"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromCache = exports.setUserIdToCache = void 0;
const cache_1 = require("./cache");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const setUserIdToCache = (req, res, next) => {
    if (!(0, exports.getUserIdFromCache)()) {
        console.log("set user id cache");
        const decodedJwt = (0, jwt_decode_1.default)(req.headers["authorization"].split(" ")[1]);
        (0, cache_1.saveValueToCache)("userId", decodedJwt.sub);
    }
    next();
};
exports.setUserIdToCache = setUserIdToCache;
const getUserIdFromCache = () => {
    return (0, cache_1.getValueFromCache)("userId");
};
exports.getUserIdFromCache = getUserIdFromCache;
