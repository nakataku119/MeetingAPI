import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Meetingデータの追加
router.post("/mtgs", async (req: Request, res: Response) => {
  const { schedule } = req.body;
  const mtg = await prisma.mtg.create({
    data: {
      schedule,
    },
  });
  return res.json(mtg);
});
// Meeting一覧の取得
router.get("/mtgs", async (req: Request, res: Response) => {
  const mtgs = await prisma.mtg.findMany();
  return res.json(mtgs);
});
// 特定Meetingの取得
router.get("/mtgs/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const mtg = await prisma.mtg.findUnique({
    where: {
      id,
    },
  });
  return res.json(mtg);
});
// Meetingデータの更新
router.put("/mtgs/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { schedule } = req.body;
  const mtg = await prisma.mtg.update({
    where: {
      id,
    },
    data: {
      schedule,
    },
  });
  return res.json(mtg);
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

// 紐付いたTopiデータの取得
router.get("/mtgs/:id/topics", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const mtg_topics = await prisma.mtg.findUnique({
    where: {
      id,
    },
    include: {
      topics: true,
    },
  });
  return res.json(mtg_topics);
});

export default router;
