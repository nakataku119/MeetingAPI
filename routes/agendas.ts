import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Topicデータの追加
router.post("/mtgs/:mtg_id/topics", async (req: Request, res: Response) => {
  const mtgId = Number(req.params.mtg_id);
  const { agenda } = req.body;
  const topic = await prisma.agenda.create({
    data: {
      agenda,
      mtgId,
    },
  });
  return res.json(topic);
});
// 特定Topicの取得
router.get("/mtgs/topic/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const topic = await prisma.agenda.findUnique({
    where: {
      id,
    },
  });
  return res.json(topic);
});
// Topicデータの更新
router.put("/mtgs/topic/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { agenda } = req.body;
  const topic = await prisma.agenda.update({
    where: {
      id,
    },
    data: {
      agenda,
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
