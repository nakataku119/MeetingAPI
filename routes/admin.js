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
const authAdmin_1 = require("../utils/authAdmin");
const errorHandle_1 = require("../utils/errorHandle");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.use(authAdmin_1.authAdmin);
router.delete("/admin/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield prisma.user.update({
            where: {
                id,
            },
            data: {
                deleted: true,
            },
        });
        return res.json(user);
    }
    catch (error) {
        (0, errorHandle_1.errorHandle)(error, res);
    }
}));
router.post("/admin/teams", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, members } = req.body.data;
    if (!name) {
        return res.status(400).json({ error: "必須項目があります。" });
    }
    try {
        const team = yield prisma.team.create({
            data: {
                name: name,
                users: {
                    connect: members,
                },
            },
        });
        return res.json(team);
    }
    catch (error) {
        (0, errorHandle_1.errorHandle)(error, res);
    }
}));
router.get("/admin/teams", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield prisma.team.findMany({
            where: { deleted: false },
            include: {
                users: true,
            },
        });
        return res.json(teams);
    }
    catch (error) {
        (0, errorHandle_1.errorHandle)(error, res);
    }
}));
router.put("/admin/teams/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { members, name } = req.body.data;
    if (!name) {
        return res.status(400).json({ error: "必須項目があります。" });
    }
    try {
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
    }
    catch (error) {
        (0, errorHandle_1.errorHandle)(error, res);
    }
}));
router.delete("/admin/teams/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const team = yield prisma.team.update({
            where: {
                id,
            },
            data: { deleted: true },
        });
        return res.json(team);
    }
    catch (error) {
        (0, errorHandle_1.errorHandle)(error, res);
    }
}));
exports.default = router;
