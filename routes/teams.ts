import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Teamデータの追加
router.post("/teams", async (req: Request, res: Response) => {
  const { name } = req.body;
  const team = await prisma.team.create({
    data: {
      name: name,
    },
  });
  return res.json(team);
});
// Team一覧の取得
router.get("/teams", async (req: Request, res: Response) => {
  const teams = await prisma.team.findMany();
  return res.json(teams);
});
// 特定チームの取得
router.get("/teams/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const team = await prisma.team.findUnique({
    where: {
      id,
    },
  });
  return res.json(team);
});
// Teamデータの更新
router.put("/teams/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const team = await prisma.team.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  return res.json(team);
});
// Topicデータの削除
router.delete("/teams/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const team = await prisma.team.delete({
    where: {
      id,
    },
  });
  return res.json(team);
});

export default router;
