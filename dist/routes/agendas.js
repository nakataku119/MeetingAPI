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
// Topicデータの追加
router.post("/mtgs/:mtg_id/topics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mtgId = Number(req.params.mtg_id);
    const { agenda } = req.body;
    const topic = yield prisma.agenda.create({
        data: {
            agenda,
            mtgId,
        },
    });
    return res.json(topic);
}));
// 特定Topicの取得
router.get("/mtgs/topic/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const topic = yield prisma.agenda.findUnique({
        where: {
            id,
        },
    });
    return res.json(topic);
}));
// Topicデータの更新
router.put("/mtgs/topic/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { agenda } = req.body;
    const topic = yield prisma.agenda.update({
        where: {
            id,
        },
        data: {
            agenda,
        },
    });
    return res.json(topic);
}));
// Topicデータの削除
router.delete("/mtgs/topic/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const topic = yield prisma.team.delete({
        where: {
            id,
        },
    });
    return res.json(topic);
}));
exports.default = router;
