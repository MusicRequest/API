"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const db_server_1 = require("../utils/db.server");
const logger_1 = __importDefault(require("../utils/logger"));
const enum_1 = require("../utils/enum");
const ENTITY = enum_1.Entity.ActivityLogs;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Récupération de collection (${ENTITY})`);
    try {
        const eventList = yield db_server_1.db[ENTITY].findMany({
            where: {
                eventId: req.params.eventId,
            },
        });
        return res.json(eventList).status(200);
    }
    catch (e) {
        logger_1.default.error("Une erreur c'est produite");
        return res.json({ status: "Une Erreur est survenue" }).status(500);
    }
});
exports.getAll = getAll;
// const getById = async (req: Request, res: Response): Promise<Response> => {
//   if (!req.params.id) return res.sendStatus(400);
//   logger.info(`Récupération id:${req.params.id}`);
//
//   try {
//     const event = await db[ENTITY].findUnique({
//       where: {
//         id: req.params.id,
//       },
//     });
//
//     if (!event) res.status(404);
//
//     return res.json(event).status(200);
//   } catch (e) {
//     logger.error("Une erreur c'est produite");
//     throw new Error("Error...");
//   }
// };
//
// const post = async (req: Request, res: Response) => {
//   logger.info(`Création de ressouce id:${req.params.id}`);
//
//   try {
//     const event = await db[ENTITY].create({
//       data: {
//         ...req.body,
//       },
//     });
//
//     return res.json(event).status(201);
//   } catch (e) {
//     logger.error("Une erreur c'est produite");
//     return res.json({ status: "Une Erreur est survenue" }).status(500);
//   }
// };
//
// const put = async (req: Request, res: Response) => {
//   logger.info(`Modification de ressouce id:${req.params.id}`);
//
//   try {
//     const event = await db[ENTITY].update({
//       where: {
//         id: req.params.id,
//       },
//       data: {
//         ...req.body,
//       },
//     });
//
//     return res.json(event).status(202);
//   } catch (e) {
//     logger.error("Une erreur c'est produite");
//     return res.json({ status: "Une Erreur est survenue" }).status(500);
//   }
// };
//
// const remove = async (req: Request, res: Response) => {
//   logger.info(`Suppression de ressouce id:${req.params.id}`);
//
//   try {
//     await db[ENTITY].delete({
//       where: {
//         id: req.params.id,
//       },
//     });
//
//     return res.status(204);
//   } catch (e) {
//     logger.error("Une erreur c'est produite");
//     return res.json({ status: "Une Erreur est survenue" }).status(500);
//   }
// };
// module.exports = {
//   getAll,
//   // getById,
//   // post,
//   // remove,
//   // put,
// };
