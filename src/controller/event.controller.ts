import { Request, Response } from "express";
import { db } from "../utils/db.server";
import logger from "../utils/logger";

const ENTITY = "event";

export const getAll = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  logger.info("Récupération des évents");
  try {
    const eventList = await db[ENTITY].findMany({});
    return res.json(eventList).status(200);
  } catch (e) {
    logger.error("Erreur: " + e);
    return res.status(500).json({ status: "Une Erreur est survenue" });
  }
};

export const getById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (!req.params.id) return res.sendStatus(400);
  logger.info(`Récupération id:${req.params.id}`);

  try {
    const event = await db[ENTITY].findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!event) res.status(404);

    return res.status(200).json(event);
  } catch (e) {
    return res.status(500).json({ status: "Une Erreur est survenue" });
  }
};

export const post = async (req: Request, res: Response) => {
  logger.info(`Création de ressouce id:${req.params.id}`);

  try {
    const event = await db[ENTITY].create({ data: { ...req.body } });
    return res.json(event).status(201);
  } catch (e) {
    logger.error("Une erreur c'est produite");
    logger.error(e);
    return res.status(500).json({ status: "Une Erreur est survenue" });
  }
};

export const put = async (req: Request, res: Response) => {
  logger.info(`Modification de ressouce id:${req.params.id}`);

  try {
    const event = await db[ENTITY].update({
      where: {
        id: req.params.id,
      },
      data: {
        ...req.body,
      },
    });
    return res.json(event).status(202);
  } catch (e) {
    return res.json({ status: "Une Erreur est survenue" }).status(500);
  }
};

export const remove = async (req: Request, res: Response) => {
  logger.info(`Suppression de ressouce id:${req.params.id}`);

  try {
    await db[ENTITY].delete({
      where: {
        id: req.params.id,
      },
    });
    return res.sendStatus(204);
  } catch (e) {
    return res.json({ status: "Une Erreur est survenue" }).status(500);
  }
};
