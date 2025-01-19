import { Request, Response } from "express";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import logger from "../utils/logger";

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  if (!username || !password || username !== "admin") {
    return res.sendStatus(403);
  }

  if (!process.env.admin || !process.env.ACCESS_TOKEN_SECRET_KEY) {
    logger.error("Variable d'environement manquante (Mot de passe admin)");
    return res.sendStatus(500);
  }

  const match = await compare(password, process.env.admin);

  if (!match) {
    return res.status(403).send({ error: "Mot de passe incorrect" });
  }

  const token = sign({}, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "30d",
  });

  logger.info("Connection d'un admin");

  return res.status(200).send({ token });
};

export const me = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({ status: "ok" });
};
