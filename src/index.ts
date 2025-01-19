import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/index.routes";
import * as http from "node:http";

import startIo from "./websocket/start";
import { db } from "./utils/db.server";
import logger from "./utils/logger";
const { Server } = require("socket.io");
const { exec } = require("child_process");

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

// Appliquer les migrations au démarrage
async function applyMigrations() {
  try {
    console.log("Vérification des migrations...");
    await db.$executeRaw`SELECT 1`; // Vérifie que la DB est connectée
    logger.info("DB connectée");
  } catch (error) {
    logger.error("Erreur lors de l'application des migrations:", error);
    process.exit(1); // Arrêter le serveur si les migrations échouent
  }

  try {
    console.log("Exécution des migrations...");

    // Exécuter la commande `npx prisma migrate deploy`
    exec(
      "npx prisma migrate deploy",
      (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.error(
            `Erreur lors de l'exécution des migrations: ${error.message}`,
          );
          return;
        }
        if (stderr) {
          console.error(`Erreur de stderr: ${stderr}`);
          return;
        }
        console.log(`Migrations réussies: ${stdout}`);
      },
    );
  } catch (error) {
    console.error("Erreur lors de l'application des migrations:", error);
  }
}

async function start() {
  await applyMigrations();
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
  });

  app.use(cors());
  app.use(express.json());

  app.use((req: any, _: any, next: () => void) => {
    req.io = io;
    next();
  });

  app.use("/api", router);

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    startIo(io);
  });
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
const server = http.createServer(app);

start();
