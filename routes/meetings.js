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
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post("/mtgs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schedule, teamId, users, agendas, freeAgenda } = req.body;
    if (!schedule || !teamId) {
        return res.status(400).json({ error: "必須項目が入力されていません。" });
    }
    try {
        const mtg = yield prisma.mtg.create({
            data: {
                schedule: schedule,
                freeAgenda: freeAgenda,
                users: {
                    connect: users,
                },
                agendas: {
                    create: agendas,
                },
                team: {
                    connect: { id: teamId },
                },
            },
        });
        return res.json(mtg);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ error: "データの登録に失敗しました。" });
    }
}));
router.put("/mtgs/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { schedule, users, agendas, teamId, freeAgenda } = req.body;
    if (!schedule || !teamId) {
        return res.status(400).json({ error: "必須項目が入力されていません。" });
    }
    try {
        const mtg = yield prisma.mtg.update({
            where: {
                id,
            },
            data: {
                schedule: schedule,
                freeAgenda: freeAgenda,
                users: {
                    set: users,
                },
                agendas: {
                    create: agendas,
                },
                team: {
                    connect: {
                        id: teamId,
                    },
                },
            },
            include: {
                team: true,
                users: true,
                agendas: true,
            },
        });
        return res.json(mtg);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ error: "データの登録に失敗しました。" });
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
        console.log(error);
        return res.status(400).json({ error: "データの削除に失敗しました。" });
    }
}));
exports.default = router;
