import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Topicデータの追加
router.post("/mtgs/:mtg_id/topics", async (req: Request, res: Response) => {
  const mtgId = Number(req.params.mtg_id);
  const { content } = req.body;
  const topic = await prisma.topic.create({
    data: {
      content,
      mtgId,
    },
  });
  return res.json(topic);
});
// 特定Topicの取得
router.get("/mtgs/topic/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const topic = await prisma.topic.findUnique({
    where: {
      id,
    },
  });
  return res.json(topic);
});
// Topicデータの更新
router.put("/mtgs/topic/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { content } = req.body;
  const topic = await prisma.topic.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });
  return res.json(topic);
});
// Topicデータの削除
router.delete("/mtgs/topic/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const topic = await prisma.team.delete({
    where: {
      id,
    },
  });
  return res.json(topic);
});

export default router;
