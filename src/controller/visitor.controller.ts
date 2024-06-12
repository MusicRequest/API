import { NextFunction, Request, Response } from "express";
import { db } from "../utils/db.server";
import logger from "../utils/logger";
import { Event, Visitor } from "@prisma/client";

const ENTITY = "visitor";

// const getAll = async (req: Request, res: Response): Promise<Response> => {
//   logger.info(`Récupération de collection (${ENTITY})`);
//   try {
//     const eventList = await db[ENTITY].findMany({});
//     return res.json(eventList).status(200);
//   } catch (e) {
//     logger.error("Une erreur c'est produite");
//     throw new Error("Error...");
//   }
// };

// const getById = async (req: Request, res: Response): Promise<Response> => {
//   if (!req.params.id) return res.sendStatus(400);
//   logger.info(`Récupération id:${req.params.id}`);

//   try {
//     const event = await db[ENTITY].findUnique({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!event) res.status(404);

//     return res.json(event).status(200);
//   } catch (e) {
//     logger.error("Une erreur c'est produite");
//     throw new Error("Error...");
//   }
// };

export const post = async (req: Request, res: Response) => {
  logger.info(`Création de ressouce Visitor id:${req.params.id}`);

  const { name, eventId }: Visitor = req.body;

  if (!name || !eventId) {
    throw new Error("Entrée invalide");
  }

  try {
    const visitor = await db[ENTITY].create({
      data: { name, eventId, countVoting: 0 },
    });

    return res.json(visitor).status(201);
  } catch (e) {
    logger.error("Une erreur c'est produite");
    return res.json({ status: "Une Erreur est survenue" }).status(500);
  }
};

export const verify = async (req: Request, res: Response) => {
  const { id, eventId } = req.params;

  logger.info(`Vérification du visiteur id:${req.params.id}`);

  if (!id || !eventId) {
    return res.json({ status: "Paramètres manquant" }).status(404);
  }

  //Vérifie que le user Existe
  let user: Visitor | null = null;
  try {
    user = await db[ENTITY].findUnique({
      where: {
        id: req.params.id,
      },
    });
  } catch (e) {
    return res
      .json({ status: "L'évenement ou l'utilisateur n'existe pas." })
      .status(404);
  }

  if (!user) {
    return res
      .json({ status: "L'évenement ou l'utilisateur n'existe pas." })
      .status(404);
  }

  //Vérifie que l'event Existe
  let event: Event | null = null;
  try {
    event = await db.event.findUnique({
      where: {
        id: req.params.eventId,
      },
    });
  } catch (e) {
    return res
      .json({ status: "L'évenement ou l'utilisateur n'existe pas." })
      .status(404);
  }

  if (!event) {
    return res
      .json({ status: "L'évenement ou l'utilisateur n'existe pas." })
      .status(404);
  }

  if (user?.eventId !== eventId) {
    return res.status(404).json({
      status: "Le visiteur ne correspond pas à l'événement en cours.",
    });
  }

  return res.json({ status: "ok" });
};

export const getFromEvent = async (req: Request, res: Response) => {
  logger.info(`Récupération de collection (${ENTITY})`);
  try {
    const visitorList = await db[ENTITY].findMany({
      where: { eventId: req.params.eventId },
    });
    return res.json(visitorList).status(200);
  } catch (e) {
    logger.error("Erreur: " + e);
    return res.json({ status: "Une Erreur est survenue" }).status(500);
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

    return res.status(202).json(event);
  } catch (e) {
    logger.error("Erreur: " + e);
    return res.status(202).json("Une erreur c'est produite");
  }
};

// const remove = async (req: Request, res: Response) => {
//   logger.info(`Suppression de ressouce id:${req.params.id}`);

//   try {
//     await db[ENTITY].delete({
//       where: {
//         id: req.params.id,
//       },
//     });

//     return res.status(204);
//   } catch (e) {
//     logger.error("Une erreur c'est produite");
//     throw new Error("Error...");
//   }
// };
