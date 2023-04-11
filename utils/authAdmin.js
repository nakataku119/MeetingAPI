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
exports.authAdmin = void 0;
const client_1 = require("@prisma/client");
const errorHandle_1 = require("./errorHandle");
const prisma = new client_1.PrismaClient();
const authAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield prisma.user.findUnique({
            where: { id: req.body.id },
        });
        if (currentUser === null || currentUser === void 0 ? void 0 : currentUser.admin) {
            next();
        }
        else {
            const error = new Error("権限がありません。");
            error.status = 403;
            next(error);
        }
    }
    catch (error) {
        (0, errorHandle_1.errorHandle)(error, res);
    }
});
exports.authAdmin = authAdmin;
