import logger from "../utils/logger";
import { db } from "../utils/db.server";
import { Visitor } from "@prisma/client";

export default function startIo(io: any) {
  // io.close();
  io.on("connection", async (socket: any) => {
    const { idUser, token } = socket.handshake.query;

    console.log(socket.handshake.query);
    if (!idUser) return;

    const userExists = (await db.visitor.findUnique({
      where: {
        id: idUser,
      },
    })) as Visitor;

    if (userExists) {
      // Set id du socket en base de données
      await db.visitor.update({
        where: {
          id: userExists.id,
        },
        data: {
          ...userExists,
          socketId: socket.id as string,
        },
      });
    }

    console.log(socket.handshake.query);
    logger.error(socket.id, ": Connection websocket");
  });
}
