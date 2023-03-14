import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
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

  await prisma.team.upsert({
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

  await prisma.mtg.upsert({
    where: { id: 1 },
    update: {
      users: { connect: [{ id: "123" }, { id: "124" }, { id: "125" }] },
    },
    create: { schedule: new Date(2023, 11, 11, 11, 11, 11) },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
