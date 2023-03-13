import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// TeamとUserの中間テーブルへ保存
router.post("/teams/:team_id/users", async (req: Request, res: Response) => {
  const { userId } = req.body;
  const teamId = Number(req.params.team_id);
  const teamToUser = await prisma.team.update({
    where: { id: teamId },
    data: {
      // users: { set: [{ id: userId }, { id: "3" }, { id: "4" }] },
      users: { set: [{ id: userId }] },
    },
  });
  return res.json(teamToUser);
});

export default router;
