import { Request, Response, NextFunction } from "express";
import jwt_decode from "jwt-decode";

export const setUserIdToReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedJwt: { sub: string } = jwt_decode(
    req.headers["authorization"]!.split(" ")[1]
  );
  req.body.id = decodedJwt.sub;
  next();
};
