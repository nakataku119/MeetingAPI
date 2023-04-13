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
router.post("/mtgs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startTime, endTime, users, agendas, freeAgenda } = req.body.data;
    if (!startTime || !endTime) {
        return res.status(422).json({ error: "必須項目が入力されていません。" });
    }
    if (startTime >= endTime) {
        return res.status(422).json({ error: "必須項目が入力されていません。" });
    }
    try {
        const mtg = yield prisma.mtg.create({
            data: {
                startTime: startTime,
                endTime: endTime,
                freeAgenda: freeAgenda,
                users: {
                    connect: users,
                },
                agendas: {
                    create: agendas,
                },
            },
        });
        return res.json(mtg);
    }
    catch (error) {
        (0, errorHandle_1.errorHandle)(error, res);
    }
}));
router.put("/mtgs/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { startTime, endTime, users, agendas, freeAgenda } = req.body.data;
    if (!startTime || !endTime) {
        return res.status(422).json({ error: "必須項目が入力されていません。" });
    }
    try {
        const mtg = yield prisma.mtg.update({
            where: {
                id,
            },
            data: {
                startTime: startTime,
                endTime: endTime,
                freeAgenda: freeAgenda,
                users: {
                    set: users,
                },
                agendas: {
                    create: agendas,
                },
            },
            include: {
                users: true,
                agendas: true,
            },
        });
        return res.json(mtg);
    }
    catch (error) {
        (0, errorHandle_1.errorHandle)(error, res);
    }
}));
router.delete("/mtgs/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const mtg = yield prisma.mtg.delete({
            where: {
                id,
            },
        });
        return res.json(mtg);
    }
    catch (error) {
        (0, errorHandle_1.errorHandle)(error, res);
    }
}));
exports.default = router;
