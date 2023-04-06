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
const express_1 = require("express");
const client_1 = require("@prisma/client");
const userId_1 = require("../utils/userId");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get("/users/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield prisma.user.findUnique({
        where: { id: (0, userId_1.getUserIdFromCache)() },
        include: {
            mtgs: { include: { agendas: true, users: true } },
            teams: {
                include: { users: { where: { NOT: { id: (0, userId_1.getUserIdFromCache)() } } } },
            },
        },
    });
    return res.json(currentUser);
}));
router.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const user = yield prisma.user.create({
        data: {
            id: (0, userId_1.getUserIdFromCache)(),
            name: name,
        },
    });
    return res.json(user);
}));
router.put("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        return;
    }
    const user = yield prisma.user.update({
        where: {
            id: (0, userId_1.getUserIdFromCache)(),
        },
        data: {
            name,
        },
    });
    return res.json(user);
}));
exports.default = router;
