import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// 既存チームへユーザーの追加
// チーム管理者のみ可能？
router.put("/teams/:team_id/users", async (req: Request, res: Response) => {
  const { userId } = req.body;
  const teamId = Number(req.params.team_id);
  const teamToUser = await prisma.team.update({
    where: { id: teamId },
    data: {
      // users: { set: [{ id: userId }, { id: "3" }, { id: "4" }] },
      users: { connect: [{ id: userId }] },
    },
  });
  return res.json(teamToUser);
});

export default router;
