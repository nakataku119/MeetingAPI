import { Request, Response, NextFunction } from "express";
import { getValueFromCache, saveValueToCache } from "./cache";
import { PrismaClient } from "@prisma/client";
import { getUserIdFromCache } from "./userId";

const prisma = new PrismaClient();

export const setUserToCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!getUserFromCache()) {
    console.log("set current user cache");
    const currentUser = await prisma.user.findUnique({
      where: { id: getUserIdFromCache() },
    });
    saveValueToCache("currentUser", currentUser);
  }
  next();
};

export const getUserFromCache = () => {
  return getValueFromCache("currentUser");
};
