import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/teams", async (req: Request, res: Response) => {
  const { name, members } = req.body.data;
  const team = await prisma.team.create({
    data: {
      name: name,
      users: {
        connect: members,
      },
    },
  });
  return res.json(team);
});

router.get("/teams", async (req: Request, res: Response) => {
  const teams = await prisma.team.findMany({
    include: {
      users: true,
    },
  });
  return res.json(teams);
});

router.put("/teams/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { members, name } = req.body.data;
  const team = await prisma.team.update({
    where: {
      id,
    },
    data: {
      name: name,
      users: {
        set: members,
      },
    },
    include: {
      users: true,
    },
  });
  return res.json(team);
});

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
