import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import logger from "../utils/logger";

export default function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!process.env.ACCESS_TOKEN_SECRET_KEY) {
    logger.error("Variable d'environement manquante (ACCES_TOKEN)");
    return res.status(500);
  }
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json("Vous n'êtes pas autorisé! Un token valide est nécessaire");
  }

  verify(
    token.replace("Bearer ", ""),
    process.env.ACCESS_TOKEN_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({
          auth: false,
          errorMessage: "L'authentification a échouée",
          status: 401,
        });
      }
      next();
    },
  );
}
