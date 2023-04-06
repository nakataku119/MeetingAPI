import { Request, Response, NextFunction } from "express";
import { getValueFromCache, saveValueToCache } from "./cache";
import jwt_decode from "jwt-decode";

export const setUserIdToCache = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!getUserIdFromCache()) {
    console.log("set user id cache");
    const decodedJwt: { sub: string } = jwt_decode(
      req.headers["authorization"]!.split(" ")[1]
    );
    saveValueToCache("userId", decodedJwt.sub);
  }
  next();
};

export const getUserIdFromCache = () => {
  return getValueFromCache("userId");
};
