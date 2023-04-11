"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCache = exports.saveValueToCache = exports.getValueFromCache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 180 });
const getValueFromCache = (key) => {
    return cache.get(key);
};
exports.getValueFromCache = getValueFromCache;
const saveValueToCache = (key, value) => {
    cache.set(key, value);
};
exports.saveValueToCache = saveValueToCache;
const deleteCache = () => {
    cache.flushAll();
};
exports.deleteCache = deleteCache;
