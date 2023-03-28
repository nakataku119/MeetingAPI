import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// 新規ミーティング作成、同時にユーザーも追加、トピックも作成
router.post("/mtgs", async (req: Request, res: Response) => {
  const { schedule, teamId, users, agendas } = req.body.data;
  const mtg = await prisma.mtg.create({
    data: {
      schedule: schedule,
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
});
// ミーティングの更新、同時に参加者も更新
router.put("/mtgs/:id", async (req: Request, res: Response) => {
  console.log("put");
  const id = Number(req.params.id);
  const { schedule, users, agendas, team } = req.body;
  const mtg = await prisma.mtg.update({
    where: {
      id,
    },
    data: {
      schedule: schedule,
      users: {
        set: users,
      },
      agendas: {
        create: agendas,
      },
      team: {
        connect: {
          id: team,
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
});
// 複数ミーティングの削除
router.delete("/agendas", async (req: Request, res: Response) => {
  const { agendas } = req.body;
  const mtgs = await prisma.agenda.deleteMany({
    where: {
      id: {
        in: agendas,
      },
    },
  });
});

// 全ミーティングの呼び出し
router.get("/mtgs", async (req: Request, res: Response) => {
  const mtgs = await prisma.mtg.findMany();
  return res.json(mtgs);
});
// あるミーティングの呼び出し
router.get("/mtgs/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const mtg = await prisma.mtg.findUnique({
    where: {
      id,
    },
  });
  return res.json(mtg);
});
// 紐付いたTopicデータの取得
router.get("/mtgs/:id/topics", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const mtg_topics = await prisma.mtg.findUnique({
    where: {
      id,
    },
    include: {
      agendas: true,
    },
  });
  return res.json(mtg_topics);
});
// 紐付いたUserデータの取得
router.get("/mtgs/:id/users", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const mtg_topics = await prisma.mtg.findUnique({
    where: {
      id,
    },
    include: {
      users: true,
    },
  });
  return res.json(mtg_topics);
});

// Meetingデータの削除
router.delete("/mtgs/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const mtg = await prisma.mtg.delete({
    where: {
      id,
    },
  });
  return res.json(mtg);
});

export default router;
