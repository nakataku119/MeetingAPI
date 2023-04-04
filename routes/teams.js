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
// 新規チーム作成、同時にユーザーも追加
router.post("/teams", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, members } = req.body.data;
    const team = yield prisma.team.create({
        data: {
            name: name,
            users: {
                connect: members,
            },
        },
    });
    return res.json(team);
}));
// 全チームの呼び出し
router.get("/teams", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield prisma.team.findMany({
        include: {
            users: true,
        },
    });
    return res.json(teams);
}));
// チームの更新、同時に所属するユーザーも更新
router.put("/teams/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { members, name } = req.body.data;
    const team = yield prisma.team.update({
        where: {
            id,
        },
        data: {
            name: name,
            users: {
                set: members,
            },
        },
        include: {
            users: true,
        },
    });
    return res.json(team);
}));
// チームの削除
router.delete("/teams/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const team = yield prisma.team.delete({
        where: {
            id,
        },
    });
    return res.json(team);
}));
exports.default = router;
