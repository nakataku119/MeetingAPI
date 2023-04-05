import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/mtgs", async (req: Request, res: Response) => {
  const { schedule, teamId, users, agendas, freeAgenda } = req.body.data;
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
  console.log("put");
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

router.get("/mtgs", async (req: Request, res: Response) => {
  const mtgs = await prisma.mtg.findMany();
  return res.json(mtgs);
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
