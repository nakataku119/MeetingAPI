"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUserToCache = exports.getUserFromCache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 180 });
const USER_CACHE_KEY = "user";
const getUserFromCache = () => {
    return cache.get(USER_CACHE_KEY);
};
exports.getUserFromCache = getUserFromCache;
const saveUserToCache = (user) => {
    cache.set(USER_CACHE_KEY, user);
};
exports.saveUserToCache = saveUserToCache;
