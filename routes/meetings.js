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
// 新規ミーティング作成、同時にユーザーも追加、トピックも作成
router.post("/mtgs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schedule, teamId, users, agendas, freeAgenda } = req.body.data;
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
}));
// ミーティングの更新、同時に参加者も更新
router.put("/mtgs/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("put");
    const id = Number(req.params.id);
    const { schedule, users, agendas, teamId, freeAgenda } = req.body.data;
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
}));
// 複数ミーティングの削除
router.delete("/agendas", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { agendas } = req.body;
    const mtgs = yield prisma.agenda.deleteMany({
        where: {
            id: {
                in: agendas,
            },
        },
    });
    return res.json(mtgs);
}));
// 全ミーティングの呼び出し
router.get("/mtgs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mtgs = yield prisma.mtg.findMany();
    return res.json(mtgs);
}));
// あるミーティングの呼び出し
router.get("/mtgs/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const mtg = yield prisma.mtg.findUnique({
        where: {
            id,
        },
    });
    return res.json(mtg);
}));
// 紐付いたTopicデータの取得
router.get("/mtgs/:id/topics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const mtg_topics = yield prisma.mtg.findUnique({
        where: {
            id,
        },
        include: {
            agendas: true,
        },
    });
    return res.json(mtg_topics);
}));
// 紐付いたUserデータの取得
router.get("/mtgs/:id/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const mtg_topics = yield prisma.mtg.findUnique({
        where: {
            id,
        },
        include: {
            users: true,
        },
    });
    return res.json(mtg_topics);
}));
// Meetingデータの削除
router.delete("/mtgs/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const mtg = yield prisma.mtg.delete({
        where: {
            id,
        },
    });
    return res.json(mtg);
}));
exports.default = router;
