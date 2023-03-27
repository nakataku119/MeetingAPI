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
// ゲストユーザーデモ用
router.get("/users/guest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const guestUser = yield prisma.user.findUnique({
        where: { id: "guest" },
        include: {
            mtgs: { include: { agendas: true, users: true, team: true } },
            teams: { include: { users: { where: { NOT: { id: "guest" } } } } },
        },
    });
    return res.json(guestUser);
}));
// ログインユーザーのデータ、所属チーム、参加ミーテイング、関連のメンバーを取得
router.get("/users/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.id);
    const currentUser = yield prisma.user.findUnique({
        where: { id: req.body.id },
        include: {
            mtgs: { include: { agendas: true, users: true } },
            teams: { include: { users: { where: { NOT: { id: req.body.id } } } } },
        },
    });
    return res.json(currentUser);
}));
// Userデータの追加
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
// User一覧の取得
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    return res.json(users);
}));
// 特定ユーザーの取得
// router.get("/users/:id", async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const user = await prisma.user.findUnique({
//     where: {
//       id,
//     },
//   });
//   return res.json(user);
// });
// Userデータの更新
router.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
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
// Userデータの削除
router.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield prisma.user.delete({
        where: {
            id,
        },
    });
    return res.json(user);
}));
// 紐づくミーティングの取得
router.get("/users/:id/mtgs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user_mtgs = yield prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            mtgs: true,
        },
    });
    return res.json(user_mtgs);
}));
// 紐づくチームの取得
router.get("/users/:id/teams", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user_teams = yield prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            teams: true,
        },
    });
    return res.json(user_teams);
}));
exports.default = router;
// 使わないAPIは作らない　情報漏洩のリスク
// フロントを作りながら、何が必要か不要か意識する
// 論理削除と物理削除
