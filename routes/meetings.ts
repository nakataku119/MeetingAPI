import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/mtgs", async (req: Request, res: Response) => {
  const { schedule, teamId, users, agendas, freeAgenda } = req.body;

  if (!schedule || !teamId) {
    return res.status(400).json({ error: "必須項目が入力されていません。" });
  }

  const mtg = await prisma.mtg.create({
    data: {
      schedule: schedule,
      freeAgenda: freeAgenda,
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

router.put("/mtgs/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { schedule, users, agendas, teamId, freeAgenda } = req.body.data;
  const mtg = await prisma.mtg.update({
    where: {
      id,
    },
    data: {
      schedule: schedule,
      freeAgenda: freeAgenda,
      users: {
        set: users,
      },
      agendas: {
        create: agendas,
      },
      team: {
        connect: {
          id: teamId,
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
