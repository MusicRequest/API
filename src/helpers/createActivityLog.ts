import logger from "../utils/logger";
import { db } from "../utils/db.server";
import { ActivityLogsType, EmitType, Entity } from "../utils/enum";

export default async function createActivityLog({
  io,
  message,
  eventId,
  type,
}: {
  io: any;
  message: string;
  eventId: string;
  type: ActivityLogsType;
}) {
  logger.info("Création d'un log d'activité");
  try {
    await db[Entity.ActivityLogs].create({
      data: {
        eventId: eventId,
        type: type,
        message: message,
      },
    });
    // io.broadcast.emit(EmitType.NewActivity, ressoure);
  } catch (e) {
    logger.error(
      "Une erreur c'est produite durant la création d'un log d'activité",
    );
    logger.error("Erreur: ", e);
  }
}
