import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { errorHandle } from "./errorHandle";

const prisma = new PrismaClient();

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: req.body.id },
    });
    if (currentUser?.admin) {
      next();
    } else {
      const error: Error & { status?: number } = new Error(
        "権限がありません。"
      );
      error.status = 403;
      next(error);
    }
  } catch (error: any) {
    errorHandle(error, res);
  }
};
