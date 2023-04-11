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
exports.getUserFromCache = exports.setUserToCache = void 0;
const cache_1 = require("./cache");
const client_1 = require("@prisma/client");
const userId_1 = require("./userId");
const prisma = new client_1.PrismaClient();
const setUserToCache = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, exports.getUserFromCache)()) {
        console.log("set current user cache");
        const currentUser = yield prisma.user.findUnique({
            where: { id: (0, userId_1.getUserIdFromCache)() },
        });
        (0, cache_1.saveValueToCache)("currentUser", currentUser);
    }
    next();
});
exports.setUserToCache = setUserToCache;
const getUserFromCache = () => {
    return (0, cache_1.getValueFromCache)("currentUser");
};
exports.getUserFromCache = getUserFromCache;
