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
        yield prisma.user.upsert({
            where: { id: "id1" },
            update: {},
            create: {
                id: "id1",
                name: "user1",
                teams: {
                    create: [{ name: "team1" }, { name: "team2" }, { name: "team3" }],
                },
                mtgs: {
                    create: [
                        {
                            schedule: new Date(2022, 1, 12, 12, 11, 11),
                            agendas: {
                                create: [
                                    { agenda: "agenda1" },
                                    { agenda: "agenda2" },
                                    { agenda: "agenda3" },
                                ],
                            },
                        },
                        {
                            schedule: new Date(2023, 11, 11, 11, 11, 11),
                            agendas: {
                                create: [
                                    { agenda: "agenda1" },
                                    { agenda: "agenda2" },
                                    { agenda: "agenda3" },
                                ],
                            },
                        },
                    ],
                },
            },
        });
        yield prisma.team.upsert({
            where: { id: 1 },
            update: {
                users: {
                    create: [
                        { id: "123", name: "user123" },
                        { id: "124", name: "user124" },
                        { id: "125", name: "user125" },
                    ],
                },
            },
            create: { name: "team1" },
        });
        yield prisma.mtg.upsert({
            where: { id: 1 },
            update: {
                users: { connect: [{ id: "123" }, { id: "124" }, { id: "125" }] },
            },
            create: { schedule: new Date(2023, 11, 11, 11, 11, 11) },
        });
    });
}
main()
    .catch((e) => console.error(e))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
