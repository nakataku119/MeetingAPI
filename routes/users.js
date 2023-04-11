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
const errorHandle_1 = require("../utils/errorHandle");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get("/users/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.id);
    try {
        const currentUser = yield prisma.user.findUnique({
            where: { id: req.body.id },
            include: {
                mtgs: {
                    include: { agendas: true, users: { where: { deleted: false } } },
                },
                teams: {
                    where: { deleted: false },
                    include: {
                        users: {
                            where: { NOT: { id: req.body.id }, deleted: false },
                        },
                    },
                },
            },
        });
        return res.json(currentUser);
    }
    catch (error) {
        (0, errorHandle_1.errorHandle)(error, res);
    }
}));
router.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const user = yield prisma.user.create({
            data: {
                id: req.body.sub,
                name: name,
            },
        });
        return res.json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ error: "作成に失敗ました。" });
    }
}));
router.put("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "ユーザー名は必須です。" });
    }
    try {
        const user = yield prisma.user.update({
            where: {
                id: req.body.sub,
            },
            data: {
                name,
            },
        });
        return res.json(user);
    }
    catch (error) {
        return res.status(400).json({ error: "更新に失敗しました。" });
    }
}));
exports.default = router;
