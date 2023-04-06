import { Request, Response, NextFunction } from "express";
import { getUserFromCache } from "./currentUser";

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  const currentUser = getUserFromCache();
  if (currentUser.admin) {
    next();
  } else {
    const error: Error & { status?: number } = new Error("権限がありません。");
    error.status = 403;
    next(error);
  }
};
