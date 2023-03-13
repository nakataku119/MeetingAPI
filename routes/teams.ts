import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// 新規チーム作成
router.post("/teams", async (req: Request, res: Response) => {
  const { name } = req.body;
  const team = await prisma.team.create({
    data: {
      name: name,
    },
  });
  return res.json(team);
});
// 全チームの呼び出し
router.get("/teams", async (req: Request, res: Response) => {
  const teams = await prisma.team.findMany();
  return res.json(teams);
});
// あるチームの呼び出し
router.get("/teams/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const team = await prisma.team.findUnique({
    where: {
      id,
    },
  });
  return res.json(team);
});
// チームの更新
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
// チームの削除
router.delete("/teams/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const team = await prisma.team.delete({
    where: {
      id,
    },
  });
  return res.json(team);
});
// 関連するユーザーの呼び出し
router.get("/teams/:id/users", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const team_users = await prisma.team.findUnique({
    where: {
      id,
    },
    include: {
      users: true,
    },
  });
  return res.json(team_users);
});

export default router;
