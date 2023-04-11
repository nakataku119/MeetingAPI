import { NextFunction, Response } from "express";

export function errorHandle(error: any, res: Response) {
  console.error(error);
  return res.status(error.status || 500).send(error.message);
}
