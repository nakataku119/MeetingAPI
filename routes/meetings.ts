import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { errorHandle } from "../utils/errorHandle";

const router = Router();
const prisma = new PrismaClient();

router.post("/mtgs", async (req: Request, res: Response) => {
  const { startTime, endTime, users, agendas, freeAgenda } = req.body.data;
  if (!startTime || !endTime) {
    return res.status(422).json({ error: "必須項目が入力されていません。" });
  }
  if (startTime >= endTime) {
    return res.status(422).json({ error: "必須項目が入力されていません。" });
  }

  try {
    const mtg = await prisma.mtg.create({
      data: {
        startTime: startTime,
        endTime: endTime,
        freeAgenda: freeAgenda,
        users: {
          connect: users,
        },
        agendas: {
          create: agendas,
        },
      },
    });
    return res.json(mtg);
  } catch (error) {
    errorHandle(error, res);
  }
});

router.put("/mtgs/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { startTime, endTime, users, agendas, freeAgenda } = req.body.data;

  if (!startTime || !endTime) {
    return res.status(422).json({ error: "必須項目が入力されていません。" });
  }

  try {
    const mtg = await prisma.mtg.update({
      where: {
        id,
      },
      data: {
        startTime: startTime,
        endTime: endTime,
        freeAgenda: freeAgenda,
        users: {
          set: users,
        },
        agendas: {
          create: agendas,
        },
      },
      include: {
        users: true,
        agendas: true,
      },
    });
    return res.json(mtg);
  } catch (error) {
    errorHandle(error, res);
  }
});

router.delete("/mtgs/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const mtg = await prisma.mtg.delete({
      where: {
        id,
      },
    });
    return res.json(mtg);
  } catch (error) {
    errorHandle(error, res);
  }
});

export default router;
