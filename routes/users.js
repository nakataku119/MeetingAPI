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
const cache_1 = require("../cache");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get("/users/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield prisma.user.findUnique({
        where: { id: req.body.id },
        include: {
            mtgs: { include: { agendas: true, users: true } },
            teams: { include: { users: { where: { NOT: { id: req.body.id } } } } },
        },
    });
    (0, cache_1.saveUserToCache)(currentUser);
    return res.json(currentUser);
}));
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log((0, cache_1.getUserFromCache)());
    console.log("test");
    const users = yield prisma.user.findMany();
    return res.json(users);
}));
router.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    const user = yield prisma.user.create({
        data: {
            id: id,
            name: name,
        },
    });
    return res.json(user);
}));
router.put("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    if (!name) {
        return;
    }
    const user = yield prisma.user.update({
        where: {
            id,
        },
        data: {
            name,
        },
    });
    return res.json(user);
}));
router.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield prisma.user.delete({
        where: {
            id,
        },
    });
    return res.json(user);
}));
exports.default = router;
