import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = [
    { id: "1", name: "山田　太郎" },
    { id: "2", name: "鈴木　一郎" },
    { id: "3", name: "佐藤　二郎" },
    { id: "4", name: "田中　三郎" },
    { id: "5", name: "鈴木　二郎" },
    { id: "guest", name: "ゲストユーザー" },
  ];
  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  const teams = [
    { name: "チームA" },
    { name: "チームB" },
    { name: "チームC" },
    { name: "チームD" },
    { name: "チームE" },
  ];
  for (const team of teams) {
    await prisma.team.create({ data: team });
  }

  await prisma.team.upsert({
    where: { id: 1 },
    update: {
      users: {
        connect: [
          { id: "guest" },
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

  await prisma.team.upsert({
    where: { id: 2 },
    update: {
      users: {
        connect: [{ id: "guest" }, { id: "1" }, { id: "2" }],
      },
    },
    create: { name: "チームB" },
  });

  await prisma.team.upsert({
    where: { id: 3 },
    update: {
      users: {
        connect: [{ id: "guest" }, { id: "1" }, { id: "2" }, { id: "5" }],
      },
    },
    create: { name: "チームC" },
  });

  await prisma.team.upsert({
    where: { id: 4 },
    update: {
      users: {
        connect: [{ id: "guest" }],
      },
    },
    create: { name: "チームD" },
  });

  await prisma.mtg.upsert({
    where: { id: 1 },
    update: {},
    create: {
      schedule: new Date(2021, 10, 10, 10, 0),
      team: { connect: { id: 1 } },
      users: {
        connect: [
          { id: "guest" },
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

  await prisma.mtg.upsert({
    where: { id: 2 },
    update: {},
    create: {
      schedule: new Date(2021, 5, 10, 10, 0),
      team: { connect: { id: 1 } },
      users: {
        connect: [{ id: "guest" }, { id: "1" }, { id: "3" }],
      },
      agendas: {
        create: [{ agenda: "業務に関して" }, { agenda: "プライベート" }],
      },
    },
  });

  await prisma.mtg.upsert({
    where: { id: 3 },
    update: {},
    create: {
      schedule: new Date(2023, 10, 10, 10, 0),
      team: { connect: { id: 1 } },
      users: {
        connect: [
          { id: "guest" },
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

  await prisma.mtg.upsert({
    where: { id: 4 },
    update: {},
    create: {
      schedule: new Date(2023, 3, 10, 10, 0),
      team: { connect: { id: 1 } },
      users: {
        connect: [{ id: "guest" }, { id: "1" }, { id: "3" }, { id: "4" }],
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
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
