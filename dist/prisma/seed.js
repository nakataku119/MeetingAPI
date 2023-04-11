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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = [
            { id: "1", name: "山田　太郎" },
            { id: "2", name: "鈴木　一郎" },
            { id: "3", name: "佐藤　二郎" },
            { id: "4", name: "田中　三郎" },
            { id: "5", name: "鈴木　二郎" },
            { id: "auth0|642d3a823595d0580ee2f804", name: "admin ユーザー" },
        ];
        for (const user of users) {
            yield prisma.user.create({ data: user });
        }
        const teams = [
            { name: "チームA" },
            { name: "チームB" },
            { name: "チームC" },
            { name: "チームD" },
            { name: "チームE" },
        ];
        for (const team of teams) {
            yield prisma.team.create({ data: team });
        }
        yield prisma.team.upsert({
            where: { id: 1 },
            update: {
                users: {
                    connect: [
                        { id: "auth0|642d3a823595d0580ee2f804" },
                        { id: "1" },
                        { id: "2" },
                        { id: "3" },
                        { id: "4" },
                        { id: "5" },
                    ],
                },
            },
            create: { name: "チームA" },
        });
        yield prisma.team.upsert({
            where: { id: 2 },
            update: {
                users: {
                    connect: [
                        { id: "auth0|642d3a823595d0580ee2f804" },
                        { id: "1" },
                        { id: "2" },
                    ],
                },
            },
            create: { name: "チームB" },
        });
        yield prisma.team.upsert({
            where: { id: 3 },
            update: {
                users: {
                    connect: [
                        { id: "auth0|642d3a823595d0580ee2f804" },
                        { id: "1" },
                        { id: "2" },
                        { id: "5" },
                    ],
                },
            },
            create: { name: "チームC" },
        });
        yield prisma.team.upsert({
            where: { id: 4 },
            update: {
                users: {
                    connect: [{ id: "auth0|642d3a823595d0580ee2f804" }],
                },
            },
            create: { name: "チームD" },
        });
        yield prisma.mtg.upsert({
            where: { id: 1 },
            update: {},
            create: {
                schedule: new Date(2021, 10, 10, 10, 0),
                team: { connect: { id: 1 } },
                users: {
                    connect: [
                        { id: "auth0|642d3a823595d0580ee2f804" },
                        { id: "1" },
                        { id: "2" },
                        { id: "3" },
                        { id: "4" },
                        { id: "5" },
                    ],
                },
                agendas: {
                    create: [
                        { agenda: "業務に関して" },
                        { agenda: "プライベート" },
                        { agenda: "今後のキャリア" },
                    ],
                },
            },
        });
        yield prisma.mtg.upsert({
            where: { id: 2 },
            update: {},
            create: {
                schedule: new Date(2021, 5, 10, 10, 0),
                team: { connect: { id: 1 } },
                users: {
                    connect: [
                        { id: "auth0|642d3a823595d0580ee2f804" },
                        { id: "1" },
                        { id: "3" },
                    ],
                },
                agendas: {
                    create: [{ agenda: "業務に関して" }, { agenda: "プライベート" }],
                },
            },
        });
        yield prisma.mtg.upsert({
            where: { id: 3 },
            update: {},
            create: {
                schedule: new Date(2023, 10, 10, 10, 0),
                team: { connect: { id: 1 } },
                users: {
                    connect: [
                        { id: "auth0|642d3a823595d0580ee2f804" },
                        { id: "1" },
                        { id: "2" },
                        { id: "3" },
                        { id: "4" },
                        { id: "5" },
                    ],
                },
                agendas: {
                    create: [{ agenda: "プライベート" }, { agenda: "今後のキャリア" }],
                },
            },
        });
        yield prisma.mtg.upsert({
            where: { id: 4 },
            update: {},
            create: {
                schedule: new Date(2023, 3, 10, 10, 0),
                team: { connect: { id: 1 } },
                users: {
                    connect: [
                        { id: "auth0|642d3a823595d0580ee2f804" },
                        { id: "1" },
                        { id: "3" },
                        { id: "4" },
                    ],
                },
                agendas: {
                    create: [
                        { agenda: "業務に関して" },
                        { agenda: "プライベート" },
                        { agenda: "今後のキャリア" },
                    ],
                },
            },
        });
    });
}
main()
    .catch((e) => console.error(e))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
