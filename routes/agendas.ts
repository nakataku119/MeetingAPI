import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.delete("/agendas", async (req: Request, res: Response) => {
  const { agendas } = req.body;
  const mtgs = await prisma.agenda.deleteMany({
    where: {
      id: {
        in: agendas,
      },
    },
  });
  return res.json(mtgs);
});

export default router;
