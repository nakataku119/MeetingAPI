import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// 新規ミーティング作成、同時にユーザーも追加
router.post("/mtgs", async (req: Request, res: Response) => {
  const { schedule, useId } = req.body;
  const mtg = await prisma.mtg.create({
    data: {
      schedule,
      users: {
        connect: [{ id: useId }],
      },
    },
  });
  return res.json(mtg);
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
      topics: true,
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
// ミーティングの更新、同時に参加者も更新
// 個別に招待するか検討
router.put("/mtgs/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { schedule, userId } = req.body;
  const mtg = await prisma.mtg.update({
    where: {
      id,
    },
    data: {
      schedule,
      users: {
        // 既存メンバーがリセットされる
        set: [{ id: userId }],
        // 既存メンバーに追加する
        // connect: [{ id: userId }]
      },
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

export default router;
