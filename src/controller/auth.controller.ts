import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import logger from "../utils/logger";

const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  if (!username || !password) return res.sendStatus(403);
  if (!process.env.admin || !process.env.ACCESS_TOKEN_SECRET_KEY) {
    logger.error("Variable d'environement manquante (Mot de passe admin)");
    return res.sendStatus(500);
  }

  const match = await bcrypt.compare(password, process.env.admin);

  if (!match) {
    return res.status(403).send({ error: "Mot de passe incorrect" });
  }

  const token = jwt.sign({}, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "30d",
  });
  return res.status(200).send({ token });
};

module.exports = { login };
